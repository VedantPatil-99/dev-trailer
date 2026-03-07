import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const PUT = async (
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

  const trailerData = await request.json();

  const { error } = await supabase
    .from("projects")
    .update({
      trailer_data: trailerData,
      status: "completed",
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: { success: true } });
};
