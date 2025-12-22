import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Next.js + TS + Tailwind",
  description: "Starter project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <nav className="bg-white shadow p-4 flex gap-4">
          {/* <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link> */}
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
