import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllGenres = (req: Request, res: Response, next: NextFunction) => {
  db.query(`select * from genres`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error", error: err });
    } else {
      res.status(200).json({ result });
    }
  });
};
const getAllGenreSongs = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  db.query(
    `SELECT song_name, songs.SID,  group_concat(artists.fullname) as artists
    FROM songs,artists,artists_songs
    where genre_name='${name}'
     and artists_songs.SID=songs.SID 
     and artists_songs.artist_name=artists.fullname 
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

export { getAllGenres, getAllGenreSongs };
