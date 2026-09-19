import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito } from "next/font/google";

import { CicloProvider } from "@/lib/client/ciclo-context";
import { FloatingTabBar } from "@/components/floating-tab-bar";
import { RegisterSw } from "@/components/register-sw";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ciclo",
  description:
    "Privacy-first menstrual cycle forecasts. Not a medical device or contraceptive method.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Ciclo",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${fraunces.variable} ${nunito.variable} h-full antialiased`}>
      <body className="min-h-full bg-background font-sans text-foreground">
        <CicloProvider>
          {children}
          <FloatingTabBar />
          <RegisterSw />
        </CicloProvider>
      </body>
    </html>
  );
}
