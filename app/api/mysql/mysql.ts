import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'rm-bp117867017m72h60qo.mysql.rds.aliyuncs.com',
  user: 'root',
  password: 'Aa2690357721',
  database: 'anime',
});
export default connection;