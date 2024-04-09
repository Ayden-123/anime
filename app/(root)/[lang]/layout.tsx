import Header from '@/components/shared/Header'
import React from 'react'
import Replicate from "replicate";
import GeneratePart from '@/components/shared/GeneratePart';
import Collection from '@/components/shared/Collection';
import Footer from '@/components/shared/Footer';
import { auth, clerkClient } from '@clerk/nextjs';
import { ReactNode } from "react";
import { getDictionary } from '@/lib/i18n';

export default async function ({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {

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
