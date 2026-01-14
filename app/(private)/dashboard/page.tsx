import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

// モックデータ（本来はAPIから取得）
const userData = {
    name: '山田 太郎',
    email: 'yamada.taro@example.com',
    phone: '090-1234-5678',
    address: '東京都渋谷区渋谷1-1-1',
    memberSince: '2024年1月',
    status: 'プレミアム会員',
    avatar: '', // 空の場合はフォールバックが表示される
};

export default function DashboardPage() {
    return (
        <div className="container mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">ダッシュボード</h1>
                <p className="text-muted-foreground">アカウント情報と利用状況を確認できます</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* プロフィールカード */}
                <Card>
                    <CardHeader>
                        <CardTitle>プロフィール</CardTitle>
                        <CardDescription>基本情報</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={userData.avatar} alt={userData.name} />
                                <AvatarFallback className="text-lg">
                                    {userData.name.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h3 className="text-xl font-semibold">{userData.name}</h3>
                                <Badge variant="secondary">{userData.status}</Badge>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">メールアドレス</Label>
                                <p className="text-sm">{userData.email}</p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">電話番号</Label>
                                <p className="text-sm">{userData.phone}</p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">住所</Label>
                                <p className="text-sm">{userData.address}</p>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">登録日</Label>
                                <p className="text-sm">{userData.memberSince}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 利用状況カード */}
                <Card>
                    <CardHeader>
                        <CardTitle>利用状況</CardTitle>
                        <CardDescription>今月の統計</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">駐車回数</p>
                                <p className="text-2xl font-bold">12回</p>
                            </div>
                            <Badge>+3</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">総支払額</p>
                                <p className="text-2xl font-bold">¥8,400</p>
                            </div>
                            <Badge variant="outline">今月</Badge>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">利用時間</p>
                                <p className="text-2xl font-bold">24時間</p>
                            </div>
                            <Badge variant="secondary">累計</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* 最近の利用履歴カード */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>最近の利用履歴</CardTitle>
                        <CardDescription>直近5件の駐車記録</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    date: '2026年1月14日',
                                    location: '渋谷パーキング A-123',
                                    duration: '2時間30分',
                                    amount: '¥750',
                                },
                                {
                                    date: '2026年1月12日',
                                    location: '新宿駅前駐車場 B-45',
                                    duration: '1時間15分',
                                    amount: '¥600',
                                },
                                {
                                    date: '2026年1月10日',
                                    location: '六本木ヒルズ P3',
                                    duration: '3時間',
                                    amount: '¥1,200',
                                },
                                {
                                    date: '2026年1月8日',
                                    location: '品川駅パーキング C-78',
                                    duration: '45分',
                                    amount: '¥400',
                                },
                                {
                                    date: '2026年1月5日',
                                    location: '銀座中央駐車場 A-12',
                                    duration: '4時間',
                                    amount: '¥2,000',
                                },
                            ].map((record, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="space-y-1">
                                        <p className="font-medium">{record.location}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {record.date} • {record.duration}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className="font-mono">
                                        {record.amount}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
