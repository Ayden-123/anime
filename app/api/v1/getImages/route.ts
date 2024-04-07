/* eslint-disable camelcase */
import { getImages } from "@/models/image";
import { NextResponse } from "next/server";
import { respData, respErr } from "@/lib/resp";
export async function GET(req: Request) {
    try {
        const body = await req.text();
        const res = await getImages()
        return respData(res)
    } catch (e) {
        console.log("getImages failed");
        return respErr("getImages failed");
    }
}