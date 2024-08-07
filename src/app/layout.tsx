import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";
import Providers from "./store/Providers";


const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  icons: {
    icon: "./icon.png",
  },
  title: "Online Order",
  description: "Online Order website",
  generator: "Next.js",
  applicationName: "Online Order",
  referrer: "origin-when-cross-origin",
  robots: "index",
  keywords: [
    "Online Order",
    "Online Order website",

  ],

  viewport: "width=device-width, initial-scale=1",
};



function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang='en'>
      <Providers>
        <body className={inter.className}>
          {children}
        </body>
      </Providers>
    </html>
  );
}

export default RootLayout;
