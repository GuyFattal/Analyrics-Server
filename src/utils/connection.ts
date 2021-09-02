import mysql, { MysqlError } from "mysql";

var pool = mysql.createPool({
  host: "sql11.freesqldatabase.com",
  user: "sql11434139",
  password: "SxjhgSCsMF",
  database: "sql11434139",
  port: 3306,
});

pool.getConnection(function (err: mysql.MysqlError) {
  console.log("Connected to DB!");
});

pool.on("error", function (err: MysqlError) {
  console.log(err.message);
});

export default pool;
