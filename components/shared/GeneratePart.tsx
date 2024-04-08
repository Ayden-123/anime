"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState, useTransition, useEffect } from "react";
import { generateImage } from '@/services/generate';
import { uploadAndDownloadFile } from '@/services/oss'
import { fetchAndConvertImage } from '@/lib/utils'
import { getUuid } from '@/lib';
import Image from 'next/image'
import message from '@/lib/message'
import { errCode } from '@/lib/code';
import { FaDownload } from "react-icons/fa";
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
const GenerateForm = ({ lang, dict, userId }: { lang: string; dict: any; userId: string}) => {
    const [query, setQuery] = useState("");
    const [isPending, startGenerate] = useTransition()
    const [imageSrc, setImageSrc] = useState("")
    const [generating, setGenerating] = useState(false)

    const handler = async () => {
        try {
            const generateInput: GenerateInput = {
                guidance_scale: 7,
                height: 512,
                prompt: query,
                num_inference_steps: 20,
                num_outputs: 1,
                scheduler: "DPMSolverMultistep",
                width: 512,
                negative_prompt: ""
            };
            const output = await generateImage(generateInput)
            let imageUrl = output[0];
            if (imageUrl === undefined) {
                const msg = dict.generate.nsfwAlert;
                message.warning({ content: msg, duration: 2500 });
                return
            }

            let fileName = getUuid() + '.png'
            await fetchAndConvertImage(imageUrl)
                .then(async ({ blob, file }) => {
                    const ossUrl = await uploadAndDownloadFile(fileName, blob)
                    if (ossUrl) {
                        setImageSrc(ossUrl);
                        const image: Image = {
                            id: getUuid(),
                            userId: userId,
                            imageUrl: ossUrl,
                            tag: "1",
                            prompt: query,
                        }
                        const uri = "/api/v1/insertImage"
                        const resp = await fetch(uri, {
                            method: "POST",
                            body: JSON.stringify(image)
                        })
                        const res = resp.json()
                    } else {
                        let msg = errCode.E101 + dict.api.golbalErr;
                        message.warning({ content: msg, duration: 2000 })
                    }
                })
                .catch(error => {
                    let msg = errCode.E102 + dict.api.golbalErr;
                    message.warning({ content: msg, duration: 2000 })
                })
        } catch (error) {
            let msg = errCode.E103 + dict.api.golbalErr;
            message.warning({ content: msg, duration: 2000 })
        }
    }

    const submit = async () => {
         if (!userId) {
            message.error({ content: dict.global.toSignIn, duration: 2000 });
            return;
        }
        setImageSrc("")
        setGenerating(true)
        await handler()
        setGenerating(false)
    }

    return (

        <div className="overflow-hidden px-2 py-12 sm:rounded-3xl sm:px-24">
            <h1 className="mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-primary sm:text-6xl">
                {dict.brand.title}
            </h1>
            <p className="mx-auto mt-5 px-4 max-w-xl text-center text-xl leading-8 text-gray-500">
                {dict.brand.sub_title}
            </p>

            <div className='xl:px-16 mt-5'>
                <Textarea placeholder={dict.generate.promptInput}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-black" />
            </div>
            <div className='text-center mt-5'>
                <Button
                    className='px-8 py-5 text-sm rounded-xl'
                    variant="outline"
                    onClick={submit}
                    disabled={generating}
                >
                    {dict.generate.promptSubmit}
                </Button>
            </div>
            <div className='mt-3 text-center lg:w-2/3 mx-auto'>
                <p className="text-gray-400 mt-5 text-xs">
                    Try some like "1girl, bishounen, casual, indoors, sitting, coffee shop, bokeh, night, turtleneck, masterpiece, best quality"
                </p>
            </div>

            <div className='flex justify-center mt-5'>
                {imageSrc === '' ? (
                    <div>
                        {generating ? (
                            <div className='mx-auto max-w-lg text-center rounded-xl border border-gray-300 p-4 shadow-sm'>
                                <Image
                                    src='/assets/images/loading1.gif'
                                    alt=""
                                    width={400}
                                    height={400}
                                />
                                <p className="mt-5 font-bold">
                                    {dict.generate.loading}
                                </p>
                            </div>

                        ) : (
                            <></>
                        )}
                    </div>
                ) : (
                    <div className='rounded-xl border border-gray-300 p-4 shadow-sm mt-5'>
                        <div className='flex justify-end'>
                            <a
                                href="http://anime123.oss-cn-hangzhou.aliyuncs.com/42af265a-593f-4238-9cf4-b5afd114c1f3.png"
                                className="font-bold "
                            >
                                <p>
                                    <FaDownload />
                                </p>
                            </a>
                        </div>
                        <Image
                            src={imageSrc}
                            alt=""
                            width={500}
                            height={500}
                            className="mt-3"
                        />
                    </div>

                )}
            </div>

        </div>
    )
}

export default GenerateForm