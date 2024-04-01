import { getDb } from "@/models/db";
import mysql from 'mysql2/promise';
// 创建一个数据库连接
export async function insertUser(user: User) {
    try {
        const db = await getDb()
        const createAt: string = new Date().toISOString();
        
        const [results, fields] = await db.query(
            `INSERT INTO user 
            (clerkId, email, username, avatarUrl, createAt, userId) 
            VALUES 
            (?, ?, ?, ?, ?, ?)
        `,
            [user.clerkId, user.email, user.username, user.avatarUrl, createAt, user.userId]
        );
        console.log('insert完成')
        console.log('result', results); // 结果集
        console.log('fields', fields); // 额外的元数据（如果有的话）
        return true
    } catch (error) {
        console.log('insertUser遇到错误了', error)
        return false;
    }
}


export async function updateUser(clearkId: string, user: User) {
    try {
        const db = await getDb()
        const [results, fields] = await db.query(
            `UPDATE user
            SET username = ?, avatarUrl = ?
            WHERE clerkId = ?
        `,
            [user.username, user.avatarUrl, clearkId]
        );
        console.log('updateUser完成')
        return true
    } catch (error) {
        console.log('updateUser遇到错误了', error)
        return false;
    }
}


export async function deleteUser(clearkId: string) {
    try {
        const db = await getDb()
        const [results, fields] = await db.query(
            `DELETE FROM user
            WHERE clerkId = ?
        `,
            [clearkId]
        );
        console.log('deleteUser完成')
        return true
    } catch (error) {
        console.log('deleteUser遇到错误了', error)
        return false;
    }
}
