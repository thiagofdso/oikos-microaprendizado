import type { Metadata } from "next";
import "./globals.css";

import { ShellBoundary } from "@/components/layout/ShellBoundary";

export const metadata: Metadata = {
  title: "Microlearning MVP",
  description: "Theme tokens, mock data, and global styles for the microlearning MVP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ShellBoundary>{children}</ShellBoundary>
      </body>
    </html>
  );
}
