import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import mysqldump from "mysqldump";
import { query } from "./../utils/query";
import { asyncify } from "./../utils/asyncify";

const getBackup = asyncify(async (req: Request, res: Response) => {
  await mysqldump({
    connection: {
      host: "sql11.freesqldatabase.com",
      user: "sql11435961",
      password: "BjBzwZMeVc",
      database: "sql11435961",
    },
    dumpToFile: "./backup.sql",
  });
  res.download("./backup.sql");
});

const loadFromFile = asyncify(async (req: Request, res: Response) => {
  if (req.file?.mimetype !== "application/x-sql") {
    res.status(400);
    throw Error("file format not supported");
  }
  const dropTablesSQL = `
  drop table if exists artists_songs;
  drop table if exists artists;
  drop table if exists writers_songs;
  drop table if exists writers;
  drop table if exists groups_words;
  drop table if exists groups_of_words;
  drop table if exists words;
  drop table if exists songs;
  drop table if exists genres;
  drop table if exists phrases;`;
  const fileSQLCommands = req.file?.buffer.toString() || "";
  await query(dropTablesSQL);
  const result = query(fileSQLCommands);
  res.status(200).json({ result });
});

export { getBackup, loadFromFile };
