import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllArtists = (req: Request, res: Response, next: NextFunction) => {
  db.query(`select * from artists`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error" });
    } else {
      res.status(200).json({ result });
    }
  });
};

const getAllArtistSongs = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  db.query(
    `SELECT song_name,songs.SID FROM artists, artists_songs,songs
     where artists.fullname=artists_songs.artist_name and artists.fullname='${name}' and artists_songs.SID=songs.SID;`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error" });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};

export { getAllArtists, getAllArtistSongs };
