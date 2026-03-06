import { NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { chromium } from "playwright";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { projectName, repoUrl, liveUrl } = body;

    if (!liveUrl) {
      return NextResponse.json(
        { success: false, error: "Live URL is required for AI generation" },
        { status: 400 }
      );
    }

    // 1. Playwright: The Virtual Cinematographer
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
      colorScheme: "dark", // <-- THIS TELLS THE WEBSITE TO USE DARK MODE
    });

    const page = await context.newPage();

    // Wait until network is idle to ensure React/Vue apps are fully rendered
    await page.goto(liveUrl, { waitUntil: "networkidle" });

    // Capture screenshot and convert directly to Base64 to skip S3 uploads
    const screenshotBuffer = await page.screenshot({ fullPage: false });
    await browser.close();

    const base64Image = screenshotBuffer.toString("base64");

    // 2. Gemini 2.5 Flash: The AI Director
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a marketing expert and UI analyst. I am providing a screenshot of a web application named "${projectName}" (Repo: ${repoUrl}).
      Analyze the visual layout and return a strictly formatted JSON object with the following:
      1. "script": A punchy, 3-sentence promotional script based on the visual context and project name.
      2. "theme": The primary brand hex color found in the screenshot.
      (Note: 2. "theme": A vibrant, light primary brand hex color found in the screenshot. It MUST contrast well and be highly visible against a pure black background. If the brand's primary color is black or dark grey, you MUST return a bright complementary accent color or white ("#ffffff") instead.)
      3. "boundingBox": Identify the most visually interesting UI component (like a pricing card, hero section, or main dashboard element) and return its bounding box coordinates as an array [ymin, xmin, ymax, xmax]. These coordinates MUST be scaled and normalized to a 0-1000 range.
      
      Return ONLY the raw JSON object, without any markdown formatting or backticks.
    `;

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/png",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();

    // Clean up potential markdown formatting from the AI response
    const cleanJsonString = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const aiData = JSON.parse(cleanJsonString);

    // 3. Coordinate Math
    // Descale from Gemini's 1000x1000 normalization back to our 1920x1080 viewport
    const [ymin, xmin, ymax, xmax] = aiData.boundingBox;
    const actual_xmin = (xmin / 1000) * 1920;
    const actual_xmax = (xmax / 1000) * 1920;
    const actual_ymin = (ymin / 1000) * 1080;
    const actual_ymax = (ymax / 1000) * 1080;

    // 4. Construct Final Payload
    const payload = {
      success: true,
      data: {
        projectName: projectName || "DevTrailer AI Generation",
        script: aiData.script,
        theme: {
          primary: aiData.theme,
          background: "#0a0a0a",
        },
        assets: [
          `data:image/png;base64,${base64Image}`, // Pass the actual screenshot to Remotion!
        ],
        focusPoint: [actual_ymin, actual_xmin, actual_ymax, actual_xmax],
      },
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (error) {
    console.error("Phase 2 AI Generation Error:", error);
    return NextResponse.json(
      { success: false, error: "AI Generation failed. Check server logs." },
      { status: 500 }
    );
  }
};
