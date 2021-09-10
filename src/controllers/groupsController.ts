import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { query } from "./../utils/query";
import { asyncify } from "./../utils/asyncify";

const getAllGroups = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  const sql = `select * from groups_of_words`;
  const result = await query(sql);
  res.status(200).json({ result });
});

const getGroupWords = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const { group_name } = req.params;
    const sql = `SELECT words.WID,groups_of_words.group_name,words.text_data,words.SID,songs.song_name,words.section,words.section_row,words.row_offset, group_concat(artists.fullname) as artists
  FROM groups_words,groups_of_words,words,songs,artists_songs,artists
  where groups_of_words.group_name=groups_words.group_name
 and artists_songs.SID=songs.SID
   and artists.fullname=artists_songs.artist_name
   and groups_of_words.group_name="${group_name}"
   and words.WID=groups_words.WordID
   and songs.SID=words.SID
   group by(words.WID)`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

const createGroup = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const sql = `insert into groups_of_words values ("${name}")`;
  const result = await query(sql);
  res.status(200).json({ result });
});

const insertWordToGroup = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const { group_name, word_ID } = req.body;
    const sql = `insert into groups_words values ("${group_name}","${word_ID}")`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

const removeWordFromGroup = asyncify(
  async (req: Request, res: Response, next: NextFunction) => {
    const { group_name, word_ID } = req.body;
    const sql = `delete 
  from groups_words 
  where group_name="${group_name}" 
  and WordID = "${word_ID}"`;
    const result = await query(sql);
    res.status(200).json({ result });
  }
);

const deleteGroup = asyncify(async (req: Request, res: Response, next: NextFunction) => {
  const { group_name } = req.params;
  let emptyGroupSQL = `delete from groups_words where group_name = "${group_name}"`;
  await query(emptyGroupSQL);
  const deleteGroupSQL = `delete 
  from groups_of_words 
  where group_name="${group_name}"`;
  const result = await query(deleteGroupSQL);
  res.status(200).json({ result });
});

export {
  getAllGroups,
  createGroup,
  insertWordToGroup,
  getGroupWords,
  removeWordFromGroup,
  deleteGroup,
};
