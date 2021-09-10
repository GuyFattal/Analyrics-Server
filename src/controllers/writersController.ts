import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { query } from "./../utils/query";

const getAllWriters = async (req: Request, res: Response, next: NextFunction) => {
  const sql = `select * from writers`;
  const result = await query(sql);
  res.status(200).json({ result });
};

const getAllWritersSongs = async (req: Request, res: Response) => {
  const { name } = req.params;
  const sql = `SELECT song_name, songs.SID,  group_concat(artists.fullname) as artists
  FROM songs,artists,artists_songs,writers_songs
  where writers_songs.SID=songs.SID
   and artists_songs.SID=songs.SID 
   and artists_songs.artist_name=artists.fullname 
   and writers_songs.writer_name="${name}"
  group by song_name,songs.SID`;
  const result = await query(sql);
  res.status(200).json({ result });
};

export { getAllWriters, getAllWritersSongs };
