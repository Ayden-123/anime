import db from './db'

export async function insertUser(user: User) {
    const createdAt: string = new Date().toISOString();

    const res = await db.query(
        `INSERT INTO users 
        (email, nickname, avatarUrl, createdAt, id) 
        VALUES 
        ($1, $2, $3, $4, $5)
    `,
        [user.email, user.nickname, user.avatarUrl, createdAt, user.userId]
    );
    return res;
}