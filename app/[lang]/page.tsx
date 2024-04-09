import React, { useContext } from 'react'
import GeneratePart from '@/components/shared/GeneratePart';
import Collection from '@/components/shared/Collection';
import { getDictionary } from '@/lib/i18n';
import { auth } from '@clerk/nextjs';
import { clerkClient } from "@clerk/nextjs";

export default async function ({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang);
  const clerkId = auth().userId;
  const userId = await getUserId(clerkId)
  
  async function getUserId(clerkId) {
    if (!clerkId) return ""
    const clerkUser = await clerkClient.users.getUser(clerkId)
    return clerkUser.publicMetadata.userId as string
  }

  return (
    <div className="mb-auto">
      <div className='max-w-6xl mx-auto md:px-10 w-full mt-20'>
          <GeneratePart lang={params.lang} dict={dict} userId={userId}/>
      </div>
      <div className='max-w-7xl mx-auto md:px-10 w-full  mt-5'>
        <Collection lang={params.lang} dict={dict}/>
      </div>
    </div>
  )
}
