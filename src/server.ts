import express from "express";
import { Request, Response } from "express";
import mysql from "mysql";

import songsRoutes from "./routes/songsRoutes";
import artistsRoutes from "./routes/artistsRoutes";

const app = express();
app.use(express.json());

app.use("/songs", songsRoutes);
app.use("/artists", songsRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Analyrics Server Works!");
});

app.listen(3100, () => {
  console.log("Application started on port 3100!");
});
