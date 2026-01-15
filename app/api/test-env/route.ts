import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        hasAuthSecret: !!process.env.AUTH_SECRET,
        authSecretLength: process.env.AUTH_SECRET?.length || 0,
        // 本番環境では実際の値は絶対に表示しない！
        nodeEnv: process.env.NODE_ENV,
        firebaseProjectId: process.env.FIREBASE_CONFIG
            ? JSON.parse(process.env.FIREBASE_CONFIG).projectId
            : 'not found',
    });
}
