/* eslint-disable camelcase */
import { NextResponse } from "next/server";
import { insertImage } from "@/models/image";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
    const body = await req.text();

    const image: Image = await JSON.parse(body);
    const flag = await insertImage(image);
    return NextResponse.json({ message: "OK", status: 200});
}