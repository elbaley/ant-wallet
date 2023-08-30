import { UserContextProvider } from "@/context/authProvider";
import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { TransactionsContextProvider } from "@/context/transactionsProvider";
import { ThemeProvider } from "./theme-provider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ant Wallet - Track Your Money",
  description: "Track Your money...",
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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
