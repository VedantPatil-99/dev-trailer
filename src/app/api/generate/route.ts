import { NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { chromium } from "playwright";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const POST = async (request: Request) => {
  try {
    const { projectName, repoUrl, liveUrl } = await request.json();

    if (!liveUrl)
      return NextResponse.json(
        { success: false, error: "Live URL required" },
        { status: 400 }
      );

    // 1. Playwright: The UPGRADED Virtual Cinematographer
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2, // <-- FIX: Doubles the resolution to 4K quality!
      colorScheme: "dark",
    });

    const page = await context.newPage();
    await page.goto(liveUrl, { waitUntil: "networkidle" });

    // Get the exact height of the scrolling page to do math later
    const pageHeight = await page.evaluate(
      () => document.documentElement.scrollHeight
    );

    // Capture the entire scrolling page, not just the top!
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    const base64Image = screenshotBuffer.toString("base64");

    // 2. Gemini 2.5 Flash: The Multi-Scene Director
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a cinematic Video Director analyzing a high-resolution, full-page website screenshot for "${projectName}".
      Identify 3 distinct, visually interesting UI components (e.g., Hero Section, Feature Cards, Code Blocks, Pricing, or Footer).
      
      Return a strictly formatted JSON object matching this structure:
      {
        "primaryColor": "A bright hex color found in the UI that contrasts against black.",
        "scenes": [
          {
            "script": "1 short, punchy sentence explaining this specific component.",
            "boundingBox": { "x": number, "y": number, "width": number, "height": number } // Scaled 0-1000
          },
          // MUST return exactly 3 scenes
        ]
      }
      Return ONLY raw JSON.
    `;

    const imagePart = {
      inlineData: { data: base64Image, mimeType: "image/png" },
    };
    const result = await model.generateContent([prompt, imagePart]);
    const cleanJsonString = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const aiData = JSON.parse(cleanJsonString);

    // 3. Math: Descale coordinates for the FULL page height
    const mappedScenes = aiData.scenes.map(
      (scene: {
        script: string;
        boundingBox: { x: number; y: number; width: number; height: number };
      }) => ({
        script: scene.script,
        boundingBox: {
          x: (scene.boundingBox.x / 1000) * 1920,
          y: (scene.boundingBox.y / 1000) * pageHeight, // Use actual page height!
          width: (scene.boundingBox.width / 1000) * 1920,
          height: (scene.boundingBox.height / 1000) * pageHeight,
        },
      })
    );

    // 4. Return new TrailerData structure
    const payload = {
      success: true,
      data: {
        projectName: projectName,
        primaryColor: aiData.primaryColor,
        assets: { screenshotUrl: `data:image/png;base64,${base64Image}` },
        scenes: mappedScenes,
      },
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { success: false, error: "Generation failed" },
      { status: 500 }
    );
  }
};
