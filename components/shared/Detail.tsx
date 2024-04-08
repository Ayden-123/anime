"use client"
import React, { useState } from 'react'
import { useEffect } from "react";
import { Button } from '../ui/button';
import { FaDownload } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import message from '@/lib/message';

const Detail = ({ lang, dict, id }: { lang: string; dict: any; id: string }) => {
    const [imageDetail, setImageDetail] = useState<Image>({})

    async function getImageDetailed() {
        try {
            const uri = `/api/v1/getImageDetailed?id=${id}`
            const resp = await fetch(uri)
            if (resp.ok) {
                const res = await resp.json()
                if (res.data.length !== 0) {
                    let data = res.data[0]
                    console.log('data', data)
                    setImageDetail({
                        id: data.id,
                        userId: data.userId,
                        imageUrl: data.imageUrl,
                        prompt: data.prompt,
                        tag: data.tag,
                    })
                } else {
                    console.log('getImageDetailed: 无该id')
                }
            }


        } catch (e) {
            // let msg = errCode.
            console.log('imageDetailed错误', e)
        }
    }

    useEffect(() => {
        getImageDetailed();
    }, [])

    return (
        <section className="overflow-hidden rounded-lg shadow-2xl md:grid md:grid-cols-3 mt-20 max-w-7xl mx-auto">
            <img
                alt=""
                src={imageDetail.imageUrl}
                className="h-32 w-full object-cover md:h-full"
            />

            <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8 ">
                <div className='lg:w-2/3 mx-auto'>
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl mx-auto">AnimeMaker Prompt</h2>

                        <p className="block rounded-xl border border-gray-300 p-4 shadow-sm hover:border-gray-200 mt-5">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vero aliquid sint distinctio
                            iure ipsum cupiditate? Quis, odit assumenda? Deleniti quasi inventore, libero reiciendis
                            minima aliquid tempora. Obcaecati, autem.
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <CopyToClipboard
                            text={imageDetail.prompt}
                            onCopy={() => message.success({ content: "Copied", duration: 1500})}
                            className='mr-5 mt-3 px-3'
                        >
                            <Button>Copy Prompt</Button>
                        </CopyToClipboard>
                    </div>

                    <div className="flex items-center justify-center mt-10 inline-block bg-black w-1/3 mx-auto rounded-xl py-3">
                        <a
                            href={imageDetail.imageUrl}
                            className="flex items-center max-w-full gap-2.5 text-sm font-bold uppercase text-white"
                        >
                            <p>Download</p>
                            <p className="text-sm">
                                <FaDownload />
                            </p>
                        </a>
                    </div>

                    {/* <p className="mt-8 text-xs font-medium uppercase text-gray-400">
                    Offer valid until 24th March, 2021 *
                </p> */}
                </div>


            </div>
        </section>
    )
}

export default Detail;
