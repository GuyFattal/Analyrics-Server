import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { query } from "./../utils/query";
import { asyncify } from "./../utils/asyncify";

const getAllArtists = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const sql = `select * from artists`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

const getAllArtistSongs = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;
    const sql = `SELECT song_name, all_artist_songs.SID,  group_concat(artists_songs.artist_name) as artists
  FROM artists_songs, (SELECT song_name, songs.SID, artists.fullname
  FROM songs,artists,artists_songs
   where artists_songs.SID=songs.SID 
   and artists_songs.artist_name=artists.fullname 
   and artists.fullname='${name}'
  group by song_name,songs.SID) as all_artist_songs
   where artists_songs.SID=all_artist_songs.SID 
   group by(song_name)`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

export { getAllArtists, getAllArtistSongs };
