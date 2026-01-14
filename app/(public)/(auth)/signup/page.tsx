'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { GoogleIcon } from '../_components/GoogleIcon';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // パスワード確認
        if (password !== confirmPassword) {
            alert('パスワードが一致しません');
            return;
        }
        // サインアップ処理をここに実装
        console.log('Sign up:', { name, email, password });
    };

    const handleGoogleSignUp = () => {
        // Google認証処理をここに実装
        console.log('Sign up with Google');
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>アカウントを作成</CardTitle>
                    <CardDescription>メールアドレスを入力して新規登録してください</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">名前</Label>
                            <Input
                                id="name"
                                onChange={e => setName(e.target.value)}
                                placeholder="山田 太郎"
                                type="text"
                                value={name}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">メールアドレス</Label>
                            <Input
                                id="email"
                                onChange={e => setEmail(e.target.value)}
                                placeholder="m@example.com"
                                type="email"
                                value={email}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">パスワード</Label>
                            <Input
                                id="password"
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                                value={password}
                                required
                                minLength={8}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">パスワード（確認）</Label>
                            <Input
                                id="confirm-password"
                                onChange={e => setConfirmPassword(e.target.value)}
                                type="password"
                                value={confirmPassword}
                                required
                                minLength={8}
                            />
                        </div>
                        <Button className="w-full" type="submit">
                            新規登録
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
                            onClick={handleGoogleSignUp}
                        >
                            <GoogleIcon />
                            Googleで登録
                        </Button>
                    </CardContent>
                </form>
                <CardFooter className="flex justify-center">
                    <p className="text-muted-foreground text-sm">
                        既にアカウントをお持ちの場合は{' '}
                        <Link className="underline" href="/signin">
                            ログイン
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
