import { Request, Response, NextFunction } from "express";
import db from "../utils/connection";
import { TextParser } from "../utils/TextParser";
import { QueryHelper } from "./../utils/QueryHelper";
import { v4 as uuidv4 } from "uuid";
import { wordsResult } from "src/types";
import { asyncify } from "./../utils/asyncify";
import { query } from "./../utils/query";

const getAllSongs = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  const sql = `SELECT song_name, songs.SID,  group_concat(artists.fullname) as artists
  FROM songs,artists,artists_songs
  where artists_songs.SID=songs.SID 
    and artists_songs.artist_name=artists.fullname 
  group by song_name,songs.SID`;
  const result = await query(sql);
  res.status(200).json({ result });
});

const getSongsByYear = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const { year } = req.params;
    const sql = `SELECT song_name, songs.SID,  group_concat(artists.fullname) as artists
  FROM songs,artists,artists_songs
  where song_year='${year}'
   and artists_songs.SID=songs.SID 
   and artists_songs.artist_name=artists.fullname 
  group by song_name,songs.SID`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

const getAllYears = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  const result = await query("select distinct(song_year) from songs");
  res.status(200).json({ result });
});

const getSongById = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const getSongByIdSQL = `SELECT songs.SID,songs.song_name,songs.song_year,songs.genre_name,group_concat(writers.fullname) as writers,artists1.artists
  FROM songs,writers,writers_songs,(SELECT songs.SID,song_name,song_year,genre_name,group_concat(artists.fullname) as artists 
            FROM songs,artists,artists_songs
            where songs.SID='${id}' 
              and artists_songs.SID=songs.SID
              and artists.fullname=artists_songs.artist_name
            group by songs.SID,song_name,song_year,genre_name)as artists1
  where songs.SID='${id}' 
    and writers_songs.SID=songs.SID
      and writers.fullname=writers_songs.writer_name
  group by songs.SID,song_name,song_year,genre_name`;
  const getSongWords = `select * from words where SID='${id}'`;

  const songs = (await query(getSongByIdSQL)) as any;
  const wordsResult: wordsResult = (await query(getSongWords)) as wordsResult;
  if (songs.length > 0) songs[0].words = wordsResult;
  res.status(200).json({ result: songs[0] });
});

const saveNewSong = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  if (req.file?.mimetype !== "text/plain") {
    res.json({ error: "file type is not txt" });
    return;
  }
  const text = req.file?.buffer.toString().split("\r\n") || [];
  const parsedSong = new TextParser(text);
  parsedSong.parseTxt();
  if (parsedSong.wrongType) {
    res.status(400);
    throw Error("file format not supported");
  }
  await insertDataToDB(parsedSong);
  res.status(200).json({ message: "song was inserted" });
});

const insertDataToDB = async (parsedSong: TextParser) => {
  const SID = uuidv4();
  await insertSong(SID, parsedSong);
  await insertWords(SID, parsedSong);
  await insertArtists(SID, parsedSong);
  await insertWriters(SID, parsedSong);
};

const insertSong = async (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  let values = qhelper.convertSongDataToTuple(
    SID,
    parsedSong.songName,
    parsedSong.songYear,
    parsedSong.songGenre
  );
  await query(`insert into songs values ${values};`);
};

const insertWords = async (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  let values = qhelper.convertWordsToTuples(parsedSong.words, SID);
  await query(`insert into words values ${values};`);
};

const insertArtists = async (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  let newArtists: string[] = [];
  const result = (await query(`select * from artists`)) as { fullname: string }[];
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
    await query(`insert into artists values ${artistsValues};`);
  }
  await query(`insert into artists_songs values ${relationValues};`);
};

const insertWriters = async (SID: string, parsedSong: TextParser) => {
  const qhelper = new QueryHelper();
  let newWriters: string[] = [];
  const result = (await query(`select * from writers`)) as { fullname: string }[];
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
    await query(`insert into writers values ${writersValues};`);
  }
  await query(`insert into writers_songs values ${relationValues};`);
};

export { saveNewSong, getAllSongs, getSongById, getSongsByYear, getAllYears };
