import "./css/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/custum/Navbar";
import Header from "@/components/custum/Header";
import { Providers } from "./providers";
import { SWRProvider } from "./swr-provider";
import ScrollTop from "@/components/custum/Scroll-top";
import ContactUs from "@/components/custum/ContactUs";
import { GoogleTagManager } from "@next/third-parties/google";
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
      <body className={`${amiri.variable} ${lateef.variable}  antialiased `}>
        <div className="container mx-auto ">
          <Providers>
            <SWRProvider>
              <header className="sticky scroll-auto top-0 rounded-tr-md w-full bg-white dark:bg-inherit z-50 border-none ">
                <Header />
                <Navbar />
              </header>
              <main className="rounded-sm shadow  z-10 ">
                <div className="pt-2 bg-dark">
                  {children}
                  <GoogleTagManager gtmId="GTM-T6ZZ29CC" />
                  <ScrollTop />
                </div>
              </main>
              <footer>
                <ContactUs />
              </footer>
            </SWRProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
