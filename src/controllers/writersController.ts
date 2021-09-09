import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllWriters = (req: Request, res: Response, next: NextFunction) => {
  db.query(`select * from writers`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error", error: err });
    } else {
      res.status(200).json({ result });
    }
  });
};

const getAllWritersSongs = (req: Request, res: Response) => {
  const { name } = req.params;
  db.query(
    `SELECT song_name, songs.SID,  group_concat(artists.fullname) as artists
    FROM songs,artists,artists_songs,writers_songs
    where writers_songs.SID=songs.SID
     and artists_songs.SID=songs.SID 
     and artists_songs.artist_name=artists.fullname 
     and writers_songs.writer_name="${name}"
    group by song_name,songs.SID`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error", error: err });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};

export { getAllWriters, getAllWritersSongs };
