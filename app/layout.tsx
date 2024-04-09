import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Inter } from "next/font/google";
import { auth, clerkClient, ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { getDictionary } from "@/lib/i18n";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);

  return {
    title: {
      template: `%s, ${dict.brand.title}`,
      default: `${dict.brand.title}`,
    },
    description: `${dict.brand.title}, ${dict.brand.sub_title}`,
    keywords:
      "sora,sora fm,sora ai,openai sora,video ai,ai video,sora video,ai video generator,text to video,sora ai video,sora ai video generator,sora webui,sora showcase,sora ai showcases",
  };
}

export default function RootLayout({
  children,
  params: { lang }
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {

  return (
    <ClerkProvider appearance={{
      variables: { colorPrimary: '#624cf5' }
    }}>
      <html lang={lang}>
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>

  );
}
