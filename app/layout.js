import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Form Builder",
  description:
    "Automate, Customize, and Streamline Your Form Building Process with Cutting-Edge AI Technology",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <Toaster className="z-30" />

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
