import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllPhrases = (req: Request, res: Response, next: NextFunction) => {
  db.query(`select * from phrases`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error" });
    } else {
      res.status(200).json({ result });
    }
  });
};
const getPhrasesSongs = (req: Request, res: Response, next: NextFunction) => {
  db.query(
    `SELECT song_name, songs.SID,  group_concat(artists.fullname) as artists
  FROM songs,artists,artists_songs
  where artists_songs.SID=songs.SID 
   and artists_songs.artist_name=artists.fullname 
  group by song_name,songs.SID`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error" });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};
const createPhrase = (req: Request, res: Response, next: NextFunction) => {
  const { phrase } = req.body;
  db.query(`insert into phrases values ("${phrase}")`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error", error: err });
    } else {
      res.status(200).json({ result });
    }
  });
};

const deletePhrase = (req: Request, res: Response, next: NextFunction) => {
  const { phrase } = req.params;
  db.query(
    `delete 
     from phrases 
     where phrase="${phrase}"`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error", error: err });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};

export { deletePhrase, getAllPhrases, getPhrasesSongs, createPhrase };
