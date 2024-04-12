"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { FaDownload } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import message from '@/lib/message';

const Detail = ({ lang, dict, id, image }: { lang: string; dict: any; id: string; image: Image}) => {

    return (
        <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 mt-20 max-w-7xl mx-auto">
            <img
                alt={image.prompt}
                src={image.imageUrl}
                className="h-32 w-full object-cover md:h-full"
            />

            <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8 ">
                <div className='lg:w-2/3 mx-auto'>
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl mx-auto">AnimeMaker</h2>

                        <p className="block rounded-xl border border-gray-300 p-4 shadow-sm hover:border-gray-200 mt-5">
                            {image.prompt}
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <CopyToClipboard
                            text={image.prompt}
                            onCopy={() => message.success({ content: "Copied", duration: 1500})}
                            className='mr-5 mt-3 px-3'
                        >
                            <Button>{dict.detail.copy}</Button>
                        </CopyToClipboard>
                    </div>

                    <div className="flex items-center justify-center mt-10 inline-block bg-black w-1/3 mx-auto rounded-xl py-3">
                        <a
                            href={image.imageUrl}
                            className="flex items-center max-w-full gap-2.5 text-sm font-bold uppercase text-white"
                        >
                            <p>{dict.detail.download}</p>
                            <p className="text-sm">
                                <FaDownload />
                            </p>
                        </a>
                    </div>

                </div>


            </div>
        </section>
    )
}

export default Detail;
