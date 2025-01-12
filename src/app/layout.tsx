import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.scss";

const jetbrainsMono = JetBrains_Mono({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Test task",
  description: "Task about flight information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.className}`}
      >
        {children}
      </body>
    </html>
  );
}
