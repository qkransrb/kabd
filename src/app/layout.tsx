import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const pretendardRegular = localFont({
  src: "./fonts/Pretendard-Regular.woff",
  variable: "--font-pretendard-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "한국생체모방치의학회",
  description: "THE KOREAN ACADEMY OF BIOMIMETIC DENTISTRY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendardRegular.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
