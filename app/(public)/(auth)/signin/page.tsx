"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { GoogleIcon } from "../_components/GoogleIcon";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // サインイン処理をここに実装
    console.log("Sign in:", { email, password });
  };

  const handleGoogleSignIn = () => {
    // Google認証処理をここに実装
    console.log("Sign in with Google");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>アカウントにログイン</CardTitle>
          <CardDescription>
            メールアドレスを入力してログインしてください
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                type="email"
                value={email}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">パスワード</Label>
                <Link
                  className="text-sm hover:underline"
                  href="/forgot-password"
                >
                  パスワードを忘れた場合
                </Link>
              </div>
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                required
              />
            </div>
            <Button className="w-full" type="submit">
              ログイン
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  または
                </span>
              </div>
            </div>
            <Button
              className="w-full"
              variant="outline"
              type="button"
              onClick={handleGoogleSignIn}
            >
              <GoogleIcon />
              Googleでログイン
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-sm">
            アカウントをお持ちでない場合は{" "}
            <Link className="underline" href="/signup">
              新規登録
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
