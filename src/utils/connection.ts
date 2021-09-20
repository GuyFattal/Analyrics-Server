import { channel } from "diagnostics_channel";
import mysql, { MysqlError } from "mysql";
import { query } from "./query";

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: 3306,
  multipleStatements: true,
});

pool.getConnection(async (err: mysql.MysqlError) => {
  console.log("Connected to DB!");
  await query(
    `set sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'`
  );
});

pool.on("error", async (err: MysqlError) => {
  console.log(err.message);
});

export default pool;
