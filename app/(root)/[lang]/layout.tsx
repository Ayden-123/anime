import Header from '@/components/shared/Header'
import React from 'react'
import Replicate from "replicate";
import GeneratePart from '@/components/shared/GeneratePart';
import Collection from '@/components/shared/Collection';
import Footer from '@/components/shared/Footer';
import { auth, clerkClient } from '@clerk/nextjs';
import { ReactNode } from "react";
import { getDictionary } from '@/lib/i18n';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const dict = await getDictionary(params.lang);

  return {
    title: {
      template: `%s, ${dict.meta.meta_title}`,
      default: `${dict.meta.meta_title}`,
    },
    description: `${dict.meta.meta_desc}`,
    keywords:  `${dict.meta.meta_keywords}`,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    icons: siteConfig.icons,
    metadataBase: siteConfig.metadataBase,
    openGraph: siteConfig.openGraph,
    twitter: siteConfig.twitter,
  };
}

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) => {

  const dict = await getDictionary(params.lang)

  return (
    
    <div className='flex flex-col h-screen justify-between'>
      <Header lang={params.lang} dict={dict}/>
      <div>
        {children}
      </div>
      <Footer lang={params.lang} dict={dict} />
    </div>
  )
}

export default Layout