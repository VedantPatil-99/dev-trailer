import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

const BUCKET = "videos";

export const POST = async (request: Request) => {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      {
        success: false,
        error: "Storage not configured. Set Supabase env vars.",
      },
      { status: 501 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const projectId = formData.get("projectId") as string | null;

    if (!file || !projectId) {
      return NextResponse.json(
        { success: false, error: "file and projectId required" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() ?? "mp4";
    const path = `${projectId}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(path);

    return NextResponse.json(
      { success: true, url: publicUrl, path },
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 }
    );
  }
};
