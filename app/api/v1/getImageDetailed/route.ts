/* eslint-disable camelcase */
import { getImageDetailed, getImages } from "@/models/image";
import { NextResponse, NextRequest } from "next/server";
import { respData, respErr } from "@/lib/resp";

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const id = searchParams.get("id")
        const res = await getImageDetailed(id)
        return respData(res)
    } catch (e) {
        console.log("getImageDetailed failed", e);
        return respErr("getImageDetailed failed");
    }
}