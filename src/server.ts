import express from "express";
import { Request, Response } from "express";
import mysql from "mysql";

import songsRoutes from "./routes/songsRoutes";
import artistsRoutes from "./routes/artistsRoutes";

const app = express();

// var con = mysql.createConnection({
//   host: "sql4.freesqldatabase.com",
//   user: "sql4432872",
//   password: "fIwZ8a98KJ",
//   database: "sql4432872",
//   port: 3306,
// });

// con.connect(function (err: mysql.MysqlError) {
//   if (err) console.log(err.message);
//   else {
//     console.log("Connected!");
//   }
// });

app.use("/songs", songsRoutes);
app.use("/artists", songsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Analyrics Server Works!");
});

app.listen(3100, () => {
  console.log("Application started on port 3100!");
});
