import type { Metadata } from "next";
import "./globals.css";
import { SuiProvider } from "./lib/sui/SuiProvider";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: "Move By Practice - Learn Sui Move by Building",
  description: "Gamified platform to learn Sui Move through interactive coding challenges. Master blockchain development with hands-on lessons.",
  keywords: ["Sui", "Move", "blockchain", "smart contracts", "web3", "learning platform"],
  authors: [{ name: "Move By Practice" }],
  openGraph: {
    title: "Move By Practice - Learn Sui Move by Building",
    description: "Gamified platform to learn Sui Move through interactive coding challenges",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <SuiProvider>
          <Navigation />
          {children}
        </SuiProvider>
      </body>
    </html>
  );
}
