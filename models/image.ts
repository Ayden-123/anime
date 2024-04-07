import { getDb } from "@/models/db";
import { auth } from "@clerk/nextjs";

export async function insertImage(image: Image) {
    try {
        const db = await getDb()
        const createAt: string = new Date().toISOString();
        // userId得从root目录传下来
        const userId = '1'
        const [results, fields] = await db.query(
            `INSERT INTO image 
            (userId, imageUrl, tag, prompt, createAt) 
            VALUES 
            (?, ?, ?, ?, ?)
        `,
            [userId, image.imageUrl, image.tag, image.prompt, createAt]
        );
        console.log('insertImage完成')
        return true
    } catch (error) {
        console.log('insertImage遇到错误了', error)
        return false;
    }
}

export async function getImages() {
    try {
        const db = await getDb()
        const createAt: string = new Date().toISOString();
        
        const [results, fields] = await db.query(
            `SELECT * FROM image
        `);
        console.log('getImages完成')
        return results
    } catch (error) {
        console.log('getImages遇到错误了', error)
        return;
    }
}