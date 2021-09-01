import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllWriters = (req: Request, res: Response, next: NextFunction) => {
  db.query(`select * from writers`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error" });
    } else {
      res.status(200).json({ result });
    }
  });
};

const getAllWritersSongs = (req: Request, res: Response) => {
  const { name } = req.params;
  db.query(
    `SELECT songs.SID,song_name
     FROM writers, writers_songs,songs where 
     writers.fullname=writers_songs.writer_name and writers.fullname='${name}' and writers_songs.SID=songs.SID;`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error" });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};

export { getAllWriters, getAllWritersSongs };
