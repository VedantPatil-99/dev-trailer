import { NextResponse } from "next/server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface SocialPostsPayload {
  projectName: string;
  repoUrl: string;
  liveUrl: string;
  script: string;
}

export interface SocialPostsResponse {
  linkedin: string;
  x: string;
  instagram: string;
}

export const POST = async (request: Request) => {
  try {
    const { projectName, repoUrl, liveUrl, script } =
      (await request.json()) as SocialPostsPayload;

    if (!projectName || !script) {
      return NextResponse.json(
        { success: false, error: "Project name and script are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
You are a social media copywriter for a developer-focused product. Generate three ready-to-paste captions for a software project trailer.

Context:
- Project name: ${projectName}
- GitHub repo: ${repoUrl || "Not provided"}
- Live demo: ${liveUrl || "Not provided"}
- Video script (what the trailer says): ${script}

Return a strictly formatted JSON object with exactly three keys:
{
  "linkedin": "Professional LinkedIn post (2-4 sentences, can be longer, tone: polished, developer-friendly). Include 2-4 relevant hashtags at the end.",
  "x": "X (Twitter) post, max 280 characters including spaces. Punchy, dev-friendly. Include 1-2 hashtags.",
  "instagram": "Instagram caption: engaging hook + 1-2 short sentences. End with 3-5 relevant hashtags on a new line."
}

Rules:
- Each caption should promote the project and the fact that the trailer was made (e.g. "Check out our new trailer", "We just shipped a promo video").
- No placeholder text. Write real, compelling copy.
- Return ONLY raw JSON, no markdown or extra text.
`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();
    const cleanJsonString = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsed = JSON.parse(cleanJsonString) as SocialPostsResponse;

    if (
      typeof parsed.linkedin !== "string" ||
      typeof parsed.x !== "string" ||
      typeof parsed.instagram !== "string"
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid AI response shape" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: parsed }, { status: 200 });
  } catch (error) {
    console.error("Social posts generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate social captions" },
      { status: 500 }
    );
  }
};
