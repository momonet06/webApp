import type { Metadata } from "next";
import localFont from "next/font/local";
import "./css/globals.css";
import Navbar from "@/components/custum/Navbar";
import Header from "@/components/custum/Header";
import { Providers } from "./providers";
import { SWRProvider } from "./swr-provider";
import ScrollTop from "@/components/custum/Scroll-top";

const amiri = localFont({
  src: "./fonts/Amiri.woff2",
  variable: "--font-amiri",
  weight: "100 900",
});
const lateef = localFont({
  src: "./fonts/Lateef.woff2",
  variable: "--font-lateef",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: {
    default: "المندوبية الجهوية للتنمية الفلاحية بنابل",
    template: "%s - نابل",
  },
  description: "قطاع الفلاحة والصيد البحري بالوطن القبلي (نابل)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
      <body className={`${amiri.variable} ${lateef.variable}  antialiased`}>
        <div className="container mx-auto ">
          <Providers>
            <SWRProvider>
              <header className="sticky top-0 rounded-tr-md w-full bg-white dark:bg-inherit z-50 border-none ">
                <Header />
                <Navbar />
              </header>
              <main className="rounded-sm shadow  z-10 ">
                <div className="pt-0">
                  {children}
                  <ScrollTop />
                </div>
              </main>
            </SWRProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
