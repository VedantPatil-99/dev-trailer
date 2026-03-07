"use client";

import { Settings } from "lucide-react";

import Sidebar from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              <Settings className="text-accent h-8 w-8" aria-hidden />
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and preferences
            </p>
          </div>

          <div className="max-w-2xl space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Choose how you want to be notified when your video is ready
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notify" className="flex-1">
                    Email when video is ready
                  </Label>
                  <Switch
                    id="email-notify"
                    defaultChecked
                    aria-label="Toggle email notifications"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Video storage</CardTitle>
                <CardDescription>
                  Your generated videos are stored so you can access them
                  anytime. Connect Supabase in env to persist across sessions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Set NEXT_PUBLIC_SUPABASE_URL and
                  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY (or
                  NEXT_PUBLIC_SUPABASE_ANON_KEY) in .env.local to enable cloud
                  storage and auth.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Sign in with Supabase to sync projects across devices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" aria-label="Manage account">
                  Manage account (coming soon)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
