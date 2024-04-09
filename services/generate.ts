"use server"

import Replicate from "replicate";

export async function generateImage ( generateInput : GenerateInput) {
    try {
        const replicate = new Replicate();
        const input = generateInput;
        // stream: false
        const output = await replicate.run("cjwbw/anything-v4.0:42a996d39a96aedc57b2e0aa8105dea39c9c89d9d266caf6bb4327a1c191b061", { input });
        
        return output;
    } catch (error) {
        return [];
    }
    
}