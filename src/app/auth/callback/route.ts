import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login?error=missing_code`);
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error("Auth callback error:", error);
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
  }

  return NextResponse.redirect(`${origin}${next}`);
};
