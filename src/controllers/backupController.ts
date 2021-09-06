import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";
import mysqldump from "mysqldump";

const getBackup = (req: Request, res: Response) => {
  mysqldump({
    connection: {
      host: "sql11.freesqldatabase.com",
      user: "sql11434139",
      password: "SxjhgSCsMF",
      database: "sql11434139",
    },
    dumpToFile: "./backup.sql",
  }).then((file) => {
    res.download("./backup.sql");
  });
};
const loadFromFile = (req: Request, res: Response) => {
  if (req.file?.mimetype !== "application/x-sql") {
    res.status(401).json({ error: "file format not supported" });
    return;
  }
  db.query(
    `
    drop table if exists artists_songs;
    drop table if exists artists;
    drop table if exists writers_songs;
    drop table if exists writers;
    drop table if exists groups_words;
    drop table if exists groups_of_words;
    drop table if exists words;
    drop table if exists songs;
    drop table if exists genres;
    drop table if exists phrases;`,
    (err, result) => {
      db.query(req.file?.buffer.toString() || "", (err, result) => {
        res.json({ err });
      });
    }
  );
};

export { getBackup, loadFromFile };
