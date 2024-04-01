import { respData, respErr } from "@/lib/resp";
import { insertUser } from '@/models/user'

export async function POST(req: Request) {
    const user = await req.text()
    // insertUser(user)


    return respData("api层返回成功")
}