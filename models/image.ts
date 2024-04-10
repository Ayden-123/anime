import { getDb } from "@/models/db";
import { auth } from "@clerk/nextjs";

export async function insertImage(image: Image) {
    try {
        const db = await getDb()
        const createAt: string = new Date().toISOString();
        // userId得从root目录传下来
        const [results, fields] = await db.query(
            `INSERT INTO image 
            (id, userId, imageUrl, tag, prompt, createAt) 
            VALUES 
            (?, ?, ?, ?, ?, ?)
        `,
            [image.id, image.userId, image.imageUrl, image.tag, image.prompt, createAt]
        );
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
            `SELECT * FROM image ORDER BY priority DESC LIMIT 30
        `);
        return results
    } catch (error) {
        console.log('getImages遇到错误了', error)
        return;
    }
}

export async function getImageDetailed(id : string) {
    try {
        const db = await getDb()
        const [results, fields] = await db.query(
            `SELECT * FROM image WHERE id = ?`, 
                [id]);
        return results
    } catch (error) {
        console.log('getImageDetailed遇到错误了', error)
        return;
    }
}