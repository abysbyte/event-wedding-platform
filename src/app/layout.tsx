import type { Metadata } from "next";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import { VogueTextMaskTransition } from "@/components/VogueTextMaskTransition";
import { PageLoader } from "@/components/PageLoader";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vogue Events & Management",
  description: "Creating unforgettable moments for your special day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${lora.variable} antialiased font-[family-name:var(--font-lora)]`}
      >
        <PageLoader />
        <VogueTextMaskTransition>{children}</VogueTextMaskTransition>
      </body>
    </html>
  );
}
