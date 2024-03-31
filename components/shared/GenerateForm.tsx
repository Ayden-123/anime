"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState, useTransition } from "react";
import { generateImage } from '@/services/generate';
import { uploadAndDownloadFile } from '@/services/oss'
import { fetchAndConvertImage } from '@/lib/utils'
import { getuid } from 'process';
import { getUuid } from '@/lib';

const GenerateForm = () => {
    const [query, setQuery] = useState("");
    const [isPending, startGenerate] = useTransition()

    const submit = async () => {
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
                    return
                }
                
                let fileName = getUuid() + '.png'

                fetchAndConvertImage(imageUrl)
                    .then(({ blob, file }) => {
                        let ossUrl = uploadAndDownloadFile(fileName, file)
                        if (!ossUrl) {
                            console.log('ossUrl录入失败', ossUrl)
                        }
                        // 录入成功就展示

                    })
                    .catch(error => {
                        console.log('fetchAndConvertImage错误', imageUrl)
                    })
                
            
            })

        } catch (error) {
            console.log('generate遇到异常', error)
        }
    }

    return (
        <div>
            <Textarea placeholder="Type your message here."
                onChange={(e) => setQuery(e.target.value)} />
            <Button variant="outline" onClick={submit}>Send message</Button>
        </div>
    )
}

export default GenerateForm