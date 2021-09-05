import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllGroups = (req: Request, res: Response, next: NextFunction) => {
  db.query(`select * from groups_of_words`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error" });
    } else {
      res.status(200).json({ result });
    }
  });
};
const getGroupWords = (req: Request, res: Response, next: NextFunction) => {
  const { group_name } = req.params;
  db.query(
    `SELECT words.WID,groups_of_words.group_name,words.text_data,words.SID,songs.song_name,words.section,words.section_row,words.row_offset
    FROM groups_words,groups_of_words,words,songs
    where groups_of_words.group_name=groups_words.group_name
     and groups_of_words.group_name="${group_name}"
     and words.WID=groups_words.WordID
     and songs.SID=words.SID`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error" });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};
const createGroup = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  db.query(`insert into groups_of_words values ("${name}")`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error", error: err });
    } else {
      res.status(200).json({ result });
    }
  });
};
const insertWordToGroup = (req: Request, res: Response, next: NextFunction) => {
  const { group_name, word_ID } = req.body;
  db.query(
    `insert into groups_words values ("${group_name}","${word_ID}")`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error", error: err });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};
const removeWordFromGroup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { group_name, word_ID } = req.body;
  db.query(
    `delete 
     from groups_words 
     where group_name="${group_name}" 
     and WordID = "${word_ID}"`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error", error: err });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};
const deleteGroup = (req: Request, res: Response, next: NextFunction) => {
  const { group_name } = req.params;
  db.query(
    `delete 
     from groups_of_words 
     where group_name="${group_name}"`,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error", error: err });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};

export {
  getAllGroups,
  createGroup,
  insertWordToGroup,
  getGroupWords,
  removeWordFromGroup,
  deleteGroup,
};
