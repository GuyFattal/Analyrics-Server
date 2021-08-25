import express from "express";
import { Request, Response } from "express";
import mysql from "mysql";

const app = express();

var con = mysql.createConnection({
  host: "sql4.freesqldatabase.com",
  user: "sql4432872",
  password: "fIwZ8a98KJ",
  database: "sql4432872",
  port: 3306,
});

con.connect(function (err: mysql.MysqlError) {
  if (err) console.log(err.message);
  else {
    console.log("Connected!");
    // con.query(
    //   "CREATE TABLE Persons (PersonID int,LastName varchar(255),    FirstName varchar(255),    Address varchar(255),City varchar(255)    )",
    //   function (err, result) {
    //     if (err) console.log(err.message);
    //     console.log(result);
    //   }
    // );

    // con.query(
    //   'insert into Persons values (1,"fattal","fattal","fattal","fattal")',
    //   function (err, result) {
    //     if (err) console.log(err.message);
    //     console.log(result);
    //   }
    // );

    con.query("select * from Persons", function (err, result, fields) {
      if (err) console.log(err.message);
      console.log(result);
    });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Application works!");
});

app.listen(3100, () => {
  console.log("Application started on port 3000!");
});
