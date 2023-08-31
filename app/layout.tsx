import { UserContextProvider } from "@/context/authProvider";
import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "./theme-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ant Wallet - Track Your Money",
  description: "Track Your money...",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          dmSans.className + " bg-grey dark:bg-darkPrimary dark:text-white"
        }
      >
        <UserContextProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
