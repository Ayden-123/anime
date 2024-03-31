import React from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState, useTransition } from "react";
import { generateImage } from '@/services/generate';
import GenerateForm from '@/components/shared/GenerateForm';
import GenerateShow from '@/components/shared/GenerateShow';
import GeneratePart from '@/components/shared/GeneratePart'

const ImageGenerate = () => {
    return (
        <div className='max-w-5xl mx-auto md:px-10 w-full  mt-5'>
            {/* <GenerateForm />
            <GenerateShow /> */}

            <GeneratePart/>
        </div>
    )
}

export default ImageGenerate