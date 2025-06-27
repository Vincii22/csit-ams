import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { PopupProvider } from "@/shared/contexts/popup-context";
import { Toaster } from "@/components/ui/sonner";
import Popup from "@/shared/components/popup";
import "./globals.css";
import ConfirmPopup from "@/shared/components/confirm-popup";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kumsociety",
  description:
    "The official dashboard of the Computer Science and Information Technology Society of Divine Word College of Legazpi which is also known by the alias Kumsociety.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${hankenGrotesk.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PopupProvider>
            {children}
            <Popup />
            <ConfirmPopup />
            <Toaster theme="dark" />
          </PopupProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
