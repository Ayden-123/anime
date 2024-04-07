import Header from '@/components/shared/Header'
import React from 'react'
import Replicate from "replicate";
import GeneratePart from '@/components/shared/GeneratePart';
import Collection from '@/components/shared/Collection';
import { auth } from '@clerk/nextjs';


const Layout = ({ children }: { children: React.ReactNode }) => {
    // 看后续首页生成图片要不要图片的userId再加，且记住是root目录下面才可以获取，一层一层传下去
    // const userId = auth().userId
    return (
        <div>
            <Header/>
            {/* <main className='flex min-h-screen w-full flex-col bg-gray-900 lg:flex-row'> */}
            <main className='flex min-h-screen w-full flex-col lg:flex-row'>
                <div className='max-w-5xl mx-auto md:px-10 w-full  mt-5'>
                    <GeneratePart/>
                    <Collection />
                </div>
            </main>
        </div>
    )
}

export default Layout
