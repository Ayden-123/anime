import Header from '@/components/shared/Header'
import React from 'react'
import ImageGenerator from './generate/page'
import Replicate from "replicate";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header/>
            {/* <main className='flex min-h-screen w-full flex-col bg-gray-900 lg:flex-row'> */}
            <main className='flex min-h-screen w-full flex-col lg:flex-row'>
                <ImageGenerator/>
            </main>
        </div>
    )
}

export default Layout
