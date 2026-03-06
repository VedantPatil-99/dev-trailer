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
      Analyze the visual layout and return a strictly formatted JSON object matching this exact structure:
      {
        "script": {
          "intro": "1 punchy sentence introducing the app.",
          "feature": "1 sentence highlighting the main UI feature seen in the screenshot.",
          "outro": "1 short call to action sentence."
        },
        "primaryColor": "A vibrant, light hex color code from the brand that contrasts well against a black background.",
        "boundingBox": {
          "x": number, // X-coordinate of the most interesting UI element (0-1000 scale)
          "y": number, // Y-coordinate (0-1000 scale)
          "width": number, // Width of the element (0-1000 scale)
          "height": number // Height of the element (0-1000 scale)
        }
      }
      Return ONLY the raw JSON object, without any markdown formatting.
    `;

    const imagePart = {
      inlineData: { data: base64Image, mimeType: "image/png" },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const responseText = result.response.text();

    const cleanJsonString = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const aiData = JSON.parse(cleanJsonString);

    // 3. Coordinate Math (Descaling from 1000x1000 back to 1920x1080)
    const { x, y, width, height } = aiData.boundingBox;
    const actual_x = (x / 1000) * 1920;
    const actual_y = (y / 1000) * 1080;
    const actual_w = (width / 1000) * 1920;
    const actual_h = (height / 1000) * 1080;

    // 4. Construct Final Payload matching the TrailerData Contract
    const payload = {
      success: true,
      data: {
        projectName: projectName || "DevTrailer AI Generation",
        primaryColor: aiData.primaryColor,
        script: aiData.script,
        assets: {
          screenshotUrl: `data:image/png;base64,${base64Image}`,
          boundingBox: {
            x: actual_x,
            y: actual_y,
            width: actual_w,
            height: actual_h,
          },
        },
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
