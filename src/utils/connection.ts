import { channel } from "diagnostics_channel";
import mysql, { MysqlError } from "mysql";

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: 3306,
  multipleStatements: true,
});

pool.getConnection(function (err: mysql.MysqlError) {
  console.log("Connected to DB!");
});

pool.on("error", function (err: MysqlError) {
  console.log(err.message);
});

export default pool;
