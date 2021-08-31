import { Request, Response, NextFunction } from "express";
import db from "../utils/connection";
import { TextParser } from "../utils/TextParser";
import { QueryHelper } from "./../utils/QueryHelper";
import { v4 as uuidv4 } from "uuid";
import { stringify } from "querystring";
import { wordsResult } from "src/types";

const getAllSongs = (req: Request, res: Response, next: NextFunction) => {
  db.query("select * from songs", (err, result) => {
    if (err) throw err;
    res.status(200).json({ data: result });
  });
};

const saveNewSong = (req: Request, res: Response, next: NextFunction) => {
  const { text }: { text: string[] } = req.body;
  const parsedSong = new TextParser(text);
  parsedSong.parseTxt();
  if (parsedSong.wrongType) {
    res.status(401).json({ error: "file format not supported" });
  }
  try {
    insertDataToDB(parsedSong);
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(401).json({ error: "internal server error" });
  }
};

const insertDataToDB = (parsedSong: TextParser) => {
  const SID = uuidv4();
  insertGenre(SID, parsedSong);
};

const insertGenre = (SID: string, parsedSong: TextParser) => {
  db.query(
    `insert into genres values ("${parsedSong.songGenre}");`,
    (err, result) => {
      if (err) throw err;
      insertSong(SID, parsedSong);
    }
  );
};

const insertSong = async (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  let values = qhelper.convertSongDataToTuple(
    SID,
    parsedSong.songName,
    parsedSong.songYear,
    parsedSong.songGenre
  );

  await db.query(`insert into songs values ${values};`, (err, result) => {
    if (err) throw err;
    insertWords(SID, parsedSong);
  });
};

const insertWords = (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  let values = qhelper.convertWordsToTuples(parsedSong.words, SID);
  db.query(`insert into words values ${values};`, (err, result) => {
    if (err) throw err;
    insertArtists(SID, parsedSong);
  });
};

const insertArtists = (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  let newArtists: string[] = [];
  db.query(`select * from artists`, (err, result) => {
    if (err) throw err;
    let currentArtists: string[] = (result as { fullname: string }[]).map(
      (artist) => artist.fullname
    );
    parsedSong.artists.forEach((artist) => {
      if (!currentArtists.includes(artist)) {
        newArtists.push(artist);
      }
    });
    const artistsValues = qhelper.convertListToTuples(newArtists);
    const relationValues = qhelper.getRelationTuple(SID, parsedSong.artists);
    if (newArtists.length > 0) {
      db.query(
        `insert into artists values ${artistsValues};`,
        (err, result) => {
          if (err) throw err;
          db.query(
            `insert into artists_songs values ${relationValues};`,
            (err, result) => {
              if (err) throw err;
              insertWriters(SID, parsedSong);
            }
          );
        }
      );
    } else {
      db.query(
        `insert into artists_songs values ${relationValues};`,
        (err, result) => {
          if (err) throw err;
          insertWriters(SID, parsedSong);
        }
      );
    }
  });
};

const insertWriters = (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  let newWriters: string[] = [];
  db.query(`select * from writers`, (err, result) => {
    if (err) throw err;
    let currentWriters: string[] = (result as { fullname: string }[]).map(
      (writer) => writer.fullname
    );
    parsedSong.writers.forEach((writer) => {
      if (!currentWriters.includes(writer)) {
        newWriters.push(writer);
      }
    });
    const writersValues = qhelper.convertListToTuples(newWriters);
    const relationValues = qhelper.getRelationTuple(SID, parsedSong.writers);
    if (newWriters.length > 0) {
      db.query(
        `insert into writers values ${writersValues};`,
        (err, result) => {
          if (err) throw err;
          db.query(
            `insert into writers_songs values ${relationValues};`,
            (err, result) => {
              if (err) throw err;
            }
          );
        }
      );
    } else {
      db.query(
        `insert into writers_songs values ${relationValues};`,
        (err, result) => {
          if (err) throw err;
        }
      );
    }
  });
};

const getSongById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  db.query(
    `SELECT songs.SID,songs.song_name,songs.song_year,songs.genre_name,group_concat(writers.fullname) as writers,artists1.artists
    FROM songs,writers,writers_songs,(SELECT songs.SID,song_name,song_year,genre_name,group_concat(artists.fullname) as artists 
              FROM songs,artists,artists_songs
              where songs.SID='${id}' 
                and artists_songs.SID=songs.SID
                and artists.fullname=artists_songs.artist_name
              group by songs.SID,song_name,song_year,genre_name)as artists1
    where songs.SID='${id}' 
      and writers_songs.SID=songs.SID
        and writers.fullname=writers_songs.writer_name
    group by songs.SID,song_name,song_year,genre_name
    `,
    (err, result) => {
      if (err) throw err;
      db.query(
        `select * from words where SID='${id}'`,
        (err, wordsResult: wordsResult) => {
          result[0].words = wordsResult;
          res.status(200).json({ result });
        }
      );
    }
  );
};

export { saveNewSong, getAllSongs, getSongById };
