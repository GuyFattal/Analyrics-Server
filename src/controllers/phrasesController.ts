import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";
import { SongWithWordsFetch } from "../types";

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
  const { phrase } = req.params;
  let lowerPhrase = phrase.toLocaleLowerCase();
  let songs: SongWithWordsFetch[] = [];
  db.query(
    `select songsWithArtists.song_name ,songsWithArtists.artists, songsWithArtists.SID,group_concat(text_data order by songsWithArtists.SID,section,section_row,row_offset separator ' ' )as words
    from (SELECT song_name, songs.SID,  group_concat(artists.fullname) as artists
    FROM songs,artists,artists_songs
    where artists_songs.SID=songs.SID 
      and artists_songs.artist_name=artists.fullname 
    group by song_name,songs.SID) as songsWithArtists,words
    where words.SID=songsWithArtists.SID
    group by songsWithArtists.SID`,
    (err, result: SongWithWordsFetch[]) => {
      if (err) {
        res.status(401).json({ message: "fatal error" });
      } else {
        result.forEach((song) => {
          if (song.words.includes(lowerPhrase)) {
            songs.push(song);
          }
        });
        res.status(200).json({ result: songs });
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
