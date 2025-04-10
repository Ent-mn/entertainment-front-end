import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata = {
  title: "Shangri-La Ulaanbaatar",
  description: "Grand Ballroom at Shangri-La Ulaanbaatar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
