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
  const SID = uuidv4();
  insertSong(SID, parsedSong);
  insertArtists(SID, parsedSong);
  insertWriters(SID, parsedSong);
  // insertWords(SID, parsedSong);
  res.status(200).json({ words: "ok" });
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
  });
};

const insertWords = (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  let values = qhelper.convertWordsToTuples(parsedSong.words, SID);
  db.query(`insert into words values ${values};`, (err, result) => {
    if (err) throw err;
  });
};

const insertArtists = (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  const artistsWithID = qhelper.generateIdToArray(parsedSong.artists);
  const artistsValues =
    qhelper.convertWritersOrArtistsDataToTuples(artistsWithID);
  const relationValues = qhelper.getRelationTuple(SID, artistsWithID);
  console.log(`insert into artists values ${artistsValues};`);
  console.log(`insert into artists_songs values ${relationValues}`);
  db.query(`insert into artists values ${artistsValues};`, (err, result) => {
    if (err) throw err;
  });
  db.query(
    `insert into artists_songs values ${relationValues};`,
    (err, result) => {
      if (err) throw err;
    }
  );
};

const insertWriters = (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  const writersWithID = qhelper.generateIdToArray(parsedSong.writers);
  const writersValues =
    qhelper.convertWritersOrArtistsDataToTuples(writersWithID);
  const relationValues = qhelper.getRelationTuple(SID, writersWithID);
  db.query(`insert into writers values ${writersValues};`, (err, result) => {
    if (err) throw err;
  });
  db.query(
    `insert into writers_songs values ${relationValues};`,
    (err, result) => {
      if (err) throw err;
    }
  );
};

export { saveNewSong, getAllSongs };
