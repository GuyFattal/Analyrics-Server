import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllWords = (req: Request, res: Response, next: NextFunction) => {
  db.query(
    `SELECT words.WID,text_data,words.SID,section,section_row,row_offset,song_name, group_concat(fullname) as artists
  FROM words,songs,artists,artists_songs
  where words.SID=songs.SID
  and artists_songs.SID=songs.SID
  and artists.fullname=artists_songs.artist_name
  group by (WID);`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error" });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};
const getWordByID = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  db.query(
    `select WID,text_data,songs.SID,section,section_row,row_offset,song_name,group_concat(fullname) as artists
    from words,songs,artists,artists_songs 
    where WID="${id}" and songs.SID = words.SID 
    and artists_songs.SID=songs.SID and artists.fullname=artists_songs.artist_name
    group by(words.WID) `,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error" });
      } else {
        res.status(200).json({ result: result[0] });
      }
    }
  );
};
const getWordGroups = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  db.query(
    `SELECT distinct(groups_words.group_name)
    FROM groups_words
    where groups_words.WordID="${id}";`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error", error: err });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};

export { getAllWords, getWordByID, getWordGroups };
