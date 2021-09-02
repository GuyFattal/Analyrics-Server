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
    `SELECT song_name, all_artist_songs.SID,  group_concat(artists_songs.artist_name) as artists
    FROM artists_songs, (SELECT song_name, songs.SID, artists.fullname
    FROM songs,artists,artists_songs
     where artists_songs.SID=songs.SID 
     and artists_songs.artist_name=artists.fullname 
     and artists.fullname='${name}'
    group by song_name,songs.SID) as all_artist_songs
     where artists_songs.SID=all_artist_songs.SID 
     group by(song_name)`,
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
