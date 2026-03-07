"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Zap } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          toast.error(error.message);
          return;
        }
      }
      router.push(next);
      router.refresh();
    } catch {
      toast.error("Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuest = () => {
    router.push(next);
    router.refresh();
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2"
          aria-label="DevTrailer home"
        >
          <Zap className="text-accent h-8 w-8" />
          <span className="text-2xl font-bold">DevTrailer</span>
        </Link>

        <Card className="p-8">
          <h1 className="mb-2 text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mb-6">Sign in to your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {!isSupabaseConfigured && (
            <p className="text-muted-foreground mt-3 text-center text-xs">
              Add Supabase env vars to enable real sign-in. Using guest mode.
            </p>
          )}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="border-border w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card text-muted-foreground px-2">or</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGuest}
            type="button"
            aria-label="Continue as guest"
          >
            Continue as Guest
          </Button>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-accent hover:underline">
              Sign Up
            </Link>
          </p>
        </Card>

        <p className="text-muted-foreground mt-8 text-center text-sm">
          <Link href="/" className="text-accent hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
