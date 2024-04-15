import React, { useContext } from 'react'
import GeneratePart from '@/components/shared/GeneratePart';
import Collection from '@/components/shared/Collection';
import { getDictionary } from '@/lib/i18n';
import { auth } from '@clerk/nextjs';
import { clerkClient } from "@clerk/nextjs";
import Link from 'next/link';
import { getImages } from '@/models/image';

const Page = async ({ params }: { params: { lang: string } }) => {
  const dict = await getDictionary(params.lang);

  let images: Image[] = [];
  images = await getImages()
  // let user: User = {};
  // user = await 

  return (
    <div className="mb-auto">
      <div className='max-w-6xl mx-auto md:px-10 w-full mt-20'>
          <GeneratePart lang={params.lang} dict={dict} />
      </div>
      
      <div className='max-w-7xl mx-auto md:px-10 w-full  mt-5'>
        <Collection lang={params.lang} dict={dict} images={images}/>
      </div>
    </div>
  )
}

export default Page