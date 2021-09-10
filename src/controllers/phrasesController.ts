import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { SongWithWordsFetch } from "../types";
import { query } from "./../utils/query";
import { asyncify } from "./../utils/asyncify";

const getAllPhrases = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const sql = `select * from phrases`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

const getPhrasesSongs = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const { phrase } = req.params;
    let lowerPhrase = phrase.toLocaleLowerCase();
    let songs: SongWithWordsFetch[] = [];
    const sql = `select songsWithArtists.song_name ,songsWithArtists.artists, songsWithArtists.SID,
                group_concat(text_data order by songsWithArtists.SID,section,section_row,row_offset separator ' ' )as words
  from (SELECT song_name, songs.SID,  group_concat(artists.fullname) as artists
  FROM songs,artists,artists_songs
  where artists_songs.SID=songs.SID 
    and artists_songs.artist_name=artists.fullname 
  group by song_name,songs.SID) as songsWithArtists,words
  where words.SID=songsWithArtists.SID
  group by songsWithArtists.SID`;
    const result = (await query(sql)) as SongWithWordsFetch[];
    result.forEach((song) => {
      if (song.words.includes(lowerPhrase)) {
        songs.push(song);
      }
    });
    res.status(200).json({ result: songs });
  }
);

const createPhrase = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  const { phrase } = req.body;
  const sql = `insert into phrases values ("${phrase}")`;
  const result = await query(sql);
  res.status(200).json({ result });
});

const deletePhrase = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  const { phrase } = req.params;
  const sql = `delete from phrases where phrase="${phrase}"`;
  const result = await query(sql);
  res.status(200).json({ result });
});

export { deletePhrase, getAllPhrases, getPhrasesSongs, createPhrase };
