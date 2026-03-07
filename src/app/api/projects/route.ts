import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

function mapRow(row: {
  id: string;
  user_id: string;
  name: string;
  repo_url: string;
  live_url: string | null;
  description: string | null;
  duration: string;
  status: string;
  script: string | null;
  trailer_data: unknown;
  video_url: string | null;
  created_at: string;
  updated_at: string;
}) {
  return {
    project_id: row.id,
    name: row.name,
    status: row.status as "processing" | "completed" | "failed",
    repo_url: row.repo_url,
    live_url: row.live_url ?? undefined,
    description: row.description ?? "",
    duration: row.duration,
    created_at: row.created_at,
    video_url: row.video_url,
    script: row.script ?? undefined,
    trailer_data: row.trailer_data ?? undefined,
  };
}

export const GET = async () => {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { useSupabase: false, projects: [] },
      { status: 501 }
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: rows, error } = await supabase
    .from("projects")
    .select(
      "id, user_id, name, repo_url, live_url, description, duration, status, script, trailer_data, video_url, created_at, updated_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    useSupabase: true,
    projects: (rows ?? []).map(mapRow),
  });
};

export const POST = async (request: Request) => {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ useSupabase: false }, { status: 501 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const name = body.project_name ?? body.name;
  const repo_url = body.repo_url ?? "";
  const live_url = body.live_url ?? null;
  const description = body.description ?? "";
  const duration = body.video_duration ?? body.duration ?? "60";

  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { error: "project_name is required" },
      { status: 400 }
    );
  }

  const { data: row, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      name: name.trim(),
      repo_url,
      live_url,
      description,
      duration,
      status: "processing",
    })
    .select(
      "id, user_id, name, repo_url, live_url, description, duration, status, script, trailer_data, video_url, created_at, updated_at"
    )
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    useSupabase: true,
    data: mapRow(row),
  });
};
