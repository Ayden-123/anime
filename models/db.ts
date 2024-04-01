import mysql from 'mysql2/promise';

let dbPool;
export function getDb() {
  if (!dbPool) {
    dbPool = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }
  return dbPool;
}
