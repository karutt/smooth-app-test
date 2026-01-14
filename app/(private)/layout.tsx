import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ダッシュボード - Smooth Parking',
    description: '駐車場決済サービス',
};

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
