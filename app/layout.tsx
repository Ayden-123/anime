import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import { auth, clerkClient, ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { getDictionary } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: { colorPrimary: '#624cf5' }
    }}>
      <body className={inter.className}>
        {children}
      </body>
    </ClerkProvider>

  );
}
