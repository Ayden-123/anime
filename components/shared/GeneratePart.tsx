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

const myLoader = ({ src, width, quality }) => {
    // return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const GenerateForm = () => {
    const [query, setQuery] = useState("");
    const [isPending, startGenerate] = useTransition()
    const [imageSrc, setImageSrc] = useState('')
    const [generating, setGenerating] = useState(false)

    const submit = async () => {

        const user: User = {
            clerkId: "sdf",
            email: "fasdf",
            userId: "fsdaf"
        }
        console.log('我要发起请求了')
        const uri = "/api/mysql/addUser"
        // const params = {};
        const resp = await fetch(uri, {
            method: "POST",
            body: JSON.stringify(user),
        })
        // console.log("resp", resp)
        const res = await resp.json()
        // console.log("res", res)

        

        // setGenerating(true)
        // const generateInput: GenerateInput = {
        //     guidance_scale: 7,
        //     height: 512,
        //     prompt: query,
        //     num_inference_steps: 20,
        //     num_outputs: 1,
        //     scheduler: "DPMSolverMultistep",
        //     width: 512,
        //     negative_prompt: ""
        // };
        // const user: User = {
        //     clerkId: "12",
        //     email: "fsda",
        //     nickname: "fsda",
        //     userId: "12"
        // }
        // const newUser = await insertUser(user)


        // try {
        //     startGenerate(async () => {
        //         const output = await generateImage(generateInput)
        //         let imageUrl = output[0];
        //         if (imageUrl === undefined) {
        //             console.log('图片生成为NSFW内容')
        //             setGenerating(false)
        //             return
        //         }

        //         let fileName = getUuid() + '.png'

        //         fetchAndConvertImage(imageUrl)
        //             .then(async ({ blob, file }) => {
        //                 console.log('fetch完成')
        //                 let flag = await uploadAndDownloadFile(fileName, blob)
        //                 if (flag) {
        //                     const url = URL.createObjectURL(blob);
        //                     setImageSrc(url);
        //                 } else {
        //                     setGenerating(false)
        //                     console.log('图片oss录入失败')
        //                 }
        //             })
        //             .catch(error => {
        //                 setGenerating(false)
        //                 console.log('fetchAndConvertImage错误', imageUrl)
        //             })
        //     })

        // } catch (error) {
        //     setGenerating(false)
        //     console.log('generate遇到异常', error)
        // }
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