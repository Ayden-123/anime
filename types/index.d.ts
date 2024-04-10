
// ====== generate Params
declare type GenerateInput = {
    guidance_scale: number,
    height: number,
    num_inference_steps: number,
    num_outputs: number,
    prompt: string,
    scheduler: string,
    width: number
    negative_prompt: string
}

declare type User = {
    id?: number,
    email?: string,
    username?: string,
    avatarUrl?: string,
    createAt?: string,
    credit?: number,
    userId?: string,
    clerkId?: string
}

declare type Image = {
    id?: string,
    userId?: string,
    imageUrl?: string,
    tag?: string,
    prompt?: string,
    createAt?: string,
    priority?: number
}

declare type Nav = {
    title: string;
    name?: string;
    url?: string;
    target?: string;
}
