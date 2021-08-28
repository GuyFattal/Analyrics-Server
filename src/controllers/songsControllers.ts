import { Request, Response, NextFunction } from "express";
import db from "../utils/connection";
import { TextParser } from "../utils/TextParser";
import { QueryHelper } from "./../utils/QueryHelper";
import { v4 as uuidv4 } from "uuid";

const getAllSongs = (req: Request, res: Response, next: NextFunction) => {
  db.query("select * from songs", (err, result) => {
    if (err) console.log(err.message);
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
  const genreId = uuidv4();
  insertGenre(genreId, SID, parsedSong);
};

const insertGenre = (genreId: string, SID: string, parsedSong: TextParser) => {
  db.query(
    `insert into genres values ("${genreId}","${parsedSong.songGenre}");`,
    (err, result) => {
      if (err) throw err;
      insertSong(SID, genreId, parsedSong);
    }
  );
};

const insertSong = async (
  SID: string,
  genreID: string,
  parsedSong: TextParser
) => {
  const qhelper = new QueryHelper();
  let values = qhelper.convertSongDataToTuple(
    SID,
    parsedSong.songName,
    parsedSong.songYear,
    genreID
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
  const artistsWithID = qhelper.generateIdToArray(parsedSong.artists);
  const artistsValues =
    qhelper.convertWritersOrArtistsDataToTuples(artistsWithID);
  const relationValues = qhelper.getRelationTuple(SID, artistsWithID);
  db.query(`insert into artists values ${artistsValues};`, (err, result) => {
    if (err) throw err;
    db.query(
      `insert into artists_songs values ${relationValues};`,
      (err, result) => {
        if (err) throw err;
        insertWriters(SID, parsedSong);
      }
    );
  });
};

const insertWriters = (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  const writersWithID = qhelper.generateIdToArray(parsedSong.writers);
  const writersValues =
    qhelper.convertWritersOrArtistsDataToTuples(writersWithID);
  const relationValues = qhelper.getRelationTuple(SID, writersWithID);
  db.query(`insert into writers values ${writersValues};`, (err, result) => {
    if (err) throw err;
    db.query(
      `insert into writers_songs values ${relationValues};`,
      (err, result) => {
        if (err) throw err;
      }
    );
  });
};

export { saveNewSong, getAllSongs };
