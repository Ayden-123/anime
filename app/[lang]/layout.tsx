import Header from '@/components/shared/Header'
import React from 'react'
import Replicate from "replicate";
import GeneratePart from '@/components/shared/GeneratePart';
import Collection from '@/components/shared/Collection';
import Footer from '@/components/shared/Footer';
import { auth } from '@clerk/nextjs';
import { ReactNode } from "react";
import { getDictionary } from '@/lib/i18n';

export default async function ({
    children,
    params,
  }: {
    children: ReactNode;
    params: { lang: string };
  }) {
    // 看后续首页生成图片要不要图片的userId再加，且记住是root目录下面才可以获取，一层一层传下去
    // const userId = auth().userId

    const dict = await getDictionary(params.lang)
    return (
        <div>
            <Header/>
            <div className='max-w-6xl mx-auto md:px-10 w-full  mt-5'>
                <GeneratePart lang={params.lang} dict={dict}/>
            </div>
            <div className='max-w-7xl mx-auto md:px-10 w-full  mt-5'>
              <Collection/>
            </div>
            <Footer lang={params.lang} dict={dict} />
        </div>
    )
}
