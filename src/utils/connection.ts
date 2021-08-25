import mysql, { MysqlError } from "mysql";

var pool = mysql.createPool({
  host: "sql4.freesqldatabase.com",
  user: "sql4432872",
  password: "fIwZ8a98KJ",
  database: "sql4432872",
  port: 3306,
});

pool.getConnection(function (err: mysql.MysqlError) {
  console.log("Connected to DB!");
});

pool.on("error", function (err: MysqlError) {
  console.log(err.message);
});

export default pool;
