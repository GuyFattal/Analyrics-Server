import mysql, { MysqlError } from "mysql";

var pool = mysql.createPool({
  host: "sql11.freesqldatabase.com",
  user: "sql11435961",
  password: "BjBzwZMeVc",
  database: "sql11435961",
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
