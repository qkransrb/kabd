import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/auth-provider";

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
      <head>
        <meta
          name="google-site-verification"
          content="14nad9KaTVsZrOdXZL_E4dhmthgIS_B52sD2-N1PSs4"
        />
        <meta
          name="naver-site-verification"
          content="37b0fb8ff84f9afcccca161e1f7fe8f970af8d71"
        />
        {/* <script
          type="text/javascript"
          src="https://stgstdpay.inicis.com/stdjs/INIStdPay.js"
        ></script> */}

        <script
          type="text/javascript"
          src="https://stdpay.inicis.com/stdjs/INIStdPay.js"
        ></script>
      </head>
      <body
        className={`${pretendardRegular.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
          <div id="payForms" hidden></div>
        </AuthProvider>
      </body>
    </html>
  );
}
