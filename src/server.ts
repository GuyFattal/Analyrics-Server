import express from "express";
import { Request, Response } from "express";
import cors from "cors";
require("dotenv").config();

import songsRoutes from "./routes/songsRoutes";
import artistsRoutes from "./routes/artistsRoutes";
import genresRoutes from "./routes/genresRoutes";
import groupsRoutes from "./routes/groupsRoutes";
import wordsRoutes from "./routes/wordsRoutes";
import writersRoutes from "./routes/writersRoutes";
import phrasesRoutes from "./routes/phrasesRoutes";
import backupRoutes from "./routes/backupRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/routeNotFound";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/songs", songsRoutes);
app.use("/artists", artistsRoutes);
app.use("/genres", genresRoutes);
app.use("/groups", groupsRoutes);
app.use("/words", wordsRoutes);
app.use("/writers", writersRoutes);
app.use("/phrases", phrasesRoutes);
app.use("/backup", backupRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Analyrics Server Works!");
});

app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT || 3100, () => {
  console.log("Application started");
});
