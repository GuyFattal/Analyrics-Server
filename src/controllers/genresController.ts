import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { asyncify } from "../utils/asyncify";
import { query } from "../utils/query";

const getAllGenres = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const sql = `select distinct(genre_name) from songs`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

const getAllGenreSongs = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    const sql = `SELECT song_name, songs.SID,  group_concat(artists.fullname) as artists
  FROM songs,artists,artists_songs
  where genre_name='${name}'
   and artists_songs.SID=songs.SID 
   and artists_songs.artist_name=artists.fullname 
  group by song_name,songs.SID`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

export { getAllGenres, getAllGenreSongs };
