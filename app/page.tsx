import Link from 'next/link';
import Image from 'next/image';
export default function Page() {
    return (
        <div className="w-full h-dvh flex justify-center items-center flex-col gap-4">
            <Link href="/signup" className="text-blue-600 underline">
                Go to Signup Page
            </Link>
            <Link href="/signin" className="text-blue-600 underline">
                Go to Login Page
            </Link>
            <Image src="/png/logo.png" alt="Logo" width={24} height={24} />
        </div>
    );
}
