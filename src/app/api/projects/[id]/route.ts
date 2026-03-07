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

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ useSupabase: false }, { status: 501 });
  }

  const { id } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: row, error } = await supabase
    .from("projects")
    .select(
      "id, user_id, name, repo_url, live_url, description, duration, status, script, trailer_data, video_url, created_at, updated_at"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !row) {
    return NextResponse.json(
      { error: error?.message ?? "Not found" },
      { status: error?.code === "PGRST116" ? 404 : 500 }
    );
  }

  return NextResponse.json({
    useSupabase: true,
    data: mapRow(row),
  });
};

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ useSupabase: false }, { status: 501 });
  }

  const { id } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const updates: Record<string, unknown> = {};
  if (typeof body.script === "string") updates.script = body.script;
  if (typeof body.status === "string") updates.status = body.status;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ data: { success: true } });
  }

  const { data: row, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
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

export const DELETE = async (
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ useSupabase: false }, { status: 501 });
  }

  const { id } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: { success: true } });
};
