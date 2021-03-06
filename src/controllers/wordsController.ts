import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { query } from "./../utils/query";
import { asyncify } from "./../utils/asyncify";

const getAllWords = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  const sql = `SELECT words.WID,text_data,words.SID,section,section_row,row_offset,song_name, group_concat(fullname) as artists
  FROM words,songs,artists,artists_songs
  where words.SID=songs.SID
  and artists_songs.SID=songs.SID
  and artists.fullname=artists_songs.artist_name
  group by (WID);`;
  const result = await query(sql);
  res.status(200).json({ result });
});

const getCommonWords = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const sql = `select text_data,count(*) as appearances from words group by text_data  order by count(*) desc limit 5;`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

const getWordByID = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const sql = `select WID,text_data,songs.SID,section,section_row,row_offset,song_name,group_concat(fullname) as artists
  from words,songs,artists,artists_songs 
  where WID="${id}" and songs.SID = words.SID 
  and artists_songs.SID=songs.SID and artists.fullname=artists_songs.artist_name
  group by(words.WID)`;
  const result = await query(sql);
  res.status(200).json({ result: result[0] });
});

const getWordByIndex = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const { SID, section, section_row, row_offset } = req.params;
    const sql = `select WID,text_data,songs.SID,section,section_row,row_offset,song_name,group_concat(fullname) as artists
  from words,songs,artists,artists_songs 
  where words.SID="${SID}"
   and words.section="${section}"
   and words.section_row="${section_row}"
   and words.row_offset="${row_offset}" and songs.SID = words.SID 
   and artists_songs.SID=songs.SID and artists.fullname=artists_songs.artist_name
  group by(words.WID)`;
    const result = await query(sql);
    res.status(200).json({ result: result[0] });
  }
);

const getWordGroups = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const sql = `SELECT distinct(groups_words.group_name)
  FROM groups_words
  where groups_words.WordID="${id}";`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

export { getAllWords, getWordByID, getWordGroups, getWordByIndex, getCommonWords };
