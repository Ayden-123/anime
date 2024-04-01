import { getDb } from "@/models/db";
import mysql from 'mysql2/promise';
// 创建一个数据库连接
export async function insertUser(user: User) {
    try {
        const db = await getDb()
        // const [results, fields] = await db.query(
        //     'SELECT * FROM `user`'
        //   );
        
        const createAt: string = new Date().toISOString();
        
        const [results, fields] = await db.query(
            `INSERT INTO user 
            (clerkId, email, nickname, avatarUrl, createAt, userId) 
            VALUES 
            ($1, $2, $3, $4, $5, $6)
        `,
            [user.clerkId, user.email, user.nickname, user.avatarUrl, createAt, user.userId]
        );
        console.log('result', results); // 结果集
        console.log('fields', fields); // 额外的元数据（如果有的话）

    } catch (error) {
        console.log('insertUser遇到错误了', error)
    }

    
    



    // console.log('result', results); // 结果集
    // console.log('fields', fields); // 额外的元数据（如果有的话）


    
    return ;
}


