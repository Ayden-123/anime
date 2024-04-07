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

const GenerateForm = ({ lang, dict }: { lang: string; dict: any }) => {
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
                const msg = dict.generate.promptInput
                message.warning({ content: msg, duration: 1500 });
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
                        message.warning({ content: msg, duration: 1500})
                    }
                })
                .catch(error => {
                    let msg = errCode.E102 + dict.api.golbalErr;
                    message.warning({ content: msg, duration: 1500})
                })
        } catch (error) {
            let msg = errCode.E103 + dict.api.golbalErr;
            message.warning({ content: msg, duration: 1500})
        }
    }

    const submit = async () => {

        setGenerating(true)
        await handler()
        setGenerating(false)
    }

    return (
        <div className="relative isolate overflow-hidden px-2 py-12 sm:rounded-3xl sm:px-24 xl:py-18">
                <h1 className="mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-primary sm:text-6xl">
                    {dict.brand.title}
                </h1>
                <p className="mx-auto mt-2 px-4 max-w-xl text-center text-xl leading-8 text-gray-300">
                    {dict.brand.sub_title}
                </p>

                <div className='xl:px-16'>
                    <Textarea placeholder={dict.generate.promptInput}
                        onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className='text-center mt-5'>
                    <Button className='px-10 py-7' variant="outline" onClick={submit}>{dict.generate.promptSubmit}</Button>
                </div>

                <div className='flex justify-center mt-10'>
                    {imageSrc === '' ? (
                        <div>
                            {generating ? (
                                <div>
                                    <Image
                                        src='/assets/images/loading1.gif'
                                        alt=""
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (
                        <Image
                            src={imageSrc}
                            alt=""
                            width={500}
                            height={500}
                        />
                    )}
                </div>

            </div>
    )
}

export default GenerateForm