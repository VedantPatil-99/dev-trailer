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

    // 1. Playwright: The Virtual Cinematographer
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
      colorScheme: "dark",
    });

    const page = await context.newPage();
    await page.goto(liveUrl, { waitUntil: "networkidle" });
    const pageHeight = await page.evaluate(
      () => document.documentElement.scrollHeight
    );
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();

    const base64Image = screenshotBuffer.toString("base64");

    // 2. Gemini 2.5 Flash: The AI Director
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      You are a cinematic Video Director analyzing a high-resolution, full-page website screenshot for "${projectName}".
      Identify EXACTLY 3 distinct, visually interesting UI components (e.g., Hero Section, Feature Cards, Pricing, or Footer).
      
      Return a strictly formatted JSON object matching this structure:
      {
        "primaryColor": "A bright hex color found in the UI that contrasts against black.",
        "scenes": [
          {
            "script": "1 short, punchy sentence explaining this specific component.",
            "boundingBox": { "x": number, "y": number, "width": number, "height": number }, // Scaled 0-1000
            "animationStyle": "zoom_in" | "pan_down" | "tilt_up"
          }
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

    const mappedScenes = aiData.scenes.map(
      (scene: {
        script: string;
        animationStyle: string;
        boundingBox: { x: number; y: number; width: number; height: number };
      }) => ({
        script: scene.script,
        animationStyle: scene.animationStyle,
        boundingBox: {
          x: (scene.boundingBox.x / 1000) * 1920,
          y: (scene.boundingBox.y / 1000) * pageHeight,
          width: (scene.boundingBox.width / 1000) * 1920,
          height: (scene.boundingBox.height / 1000) * pageHeight,
        },
      })
    );

    // 3. ElevenLabs: The AI Voice Actor
    let voiceoverUrl = null;
    const combinedScript = mappedScenes
      .map((s: { script: string }) => s.script)
      .join(". ");

    try {
      // Using 'Adam', a great professional narrator voice ID
      const elevenRes = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/IKne3meq5aSn9XLyUdCD",
        {
          method: "POST",
          headers: {
            Accept: "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
          },
          body: JSON.stringify({
            text: combinedScript,
            model_id: "eleven_multilingual_v2",
            voice_settings: { stability: 0.5, similarity_boost: 0.75 },
          }),
        }
      );

      if (elevenRes.ok) {
        const audioArrayBuffer = await elevenRes.arrayBuffer();
        const audioBuffer = Buffer.from(audioArrayBuffer);
        voiceoverUrl = `data:audio/mpeg;base64,${audioBuffer.toString("base64")}`;
      } else {
        console.warn("ElevenLabs Error:", await elevenRes.text());
      }
    } catch (e) {
      console.error("Failed to generate voiceover", e);
    }

    // 4. Return the Payload with Voiceover
    const payload = {
      success: true,
      data: {
        projectName: projectName,
        primaryColor: aiData.primaryColor,
        assets: {
          screenshotUrl: `data:image/png;base64,${base64Image}`,
          voiceoverUrl: voiceoverUrl, // <-- Passing the audio to the frontend
        },
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
