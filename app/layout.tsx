import { UserContextProvider } from "@/context/authProvider";
import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { TransactionsContextProvider } from "@/context/transactionsProvider";

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
      <body className={dmSans.className + " bg-grey"}>
        <UserContextProvider>
          <TransactionsContextProvider>{children}</TransactionsContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
