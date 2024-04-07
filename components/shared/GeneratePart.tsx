"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState, useTransition, useEffect } from "react";
import { generateImage } from '@/services/generate';
import { uploadAndDownloadFile } from '@/services/oss'
import { fetchAndConvertImage } from '@/lib/utils'
import { getuid } from 'process';
import { getUuid } from '@/lib';
import Image from 'next/image'
import { insertUser } from '@/models/user';
import { auth } from '@clerk/nextjs';

const GenerateForm = () => {
    const [query, setQuery] = useState("");
    const [isPending, startGenerate] = useTransition()
    const [imageSrc, setImageSrc] = useState("")
    const [generating, setGenerating] = useState(false)

    const submit = async () => {

        setGenerating(true)
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

        try {
            startGenerate(async () => {
                const output = await generateImage(generateInput)
                let imageUrl = output[0];
                if (imageUrl === undefined) {
                    console.log('图片生成为NSFW内容')
                    setGenerating(false)
                    return
                }

                let fileName = getUuid() + '.png'
                fetchAndConvertImage(imageUrl)
                    .then(async ({ blob, file }) => {
                        console.log('fetch完成')
                        const ossUrl = await uploadAndDownloadFile(fileName, blob)
                        if (ossUrl) {
                            // const imageUrl = URL.createObjectURL(blob); // 这是将blob或file转为url的方法
                            setImageSrc(ossUrl);

                            const image: Image = {
                                imageUrl: imageUrl,
                                tag: "1",
                                prompt: query,
                            }
                            const uri = "/api/v1/insertImage"
                            const resp = await fetch(uri, {
                                method: "POST",
                                body: JSON.stringify(image)
                            })
                            const res = resp.json()
                            console.log('图片添加至数据库中')
                            
                        } else {
                            console.log('图片oss录入失败')
                        }
                    })
                    .catch(error => {
                        console.log('uploadAndDownloadFile错误', error)
                    })
            })
        } catch (error) {
            console.log('generate遇到异常', error)
        }
        setGenerating(false)
    }

    return (
        <div>
            <Textarea placeholder="Type your message here."
                onChange={(e) => setQuery(e.target.value)} />
            <Button variant="outline" onClick={submit}>Send message</Button>

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
    )
}

export default GenerateForm