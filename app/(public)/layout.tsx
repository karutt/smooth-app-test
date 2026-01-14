import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Smooth Parking',
    description: '駐車場決済サービス',
};

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
