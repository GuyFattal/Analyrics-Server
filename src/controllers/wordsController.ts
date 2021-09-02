import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllWords = (req: Request, res: Response, next: NextFunction) => {
  db.query(`select * from words`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error" });
    } else {
      res.status(200).json({ result });
    }
  });
};
const getWordByID = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  db.query(
    `select *
    from words,songs 
    where WID="${id}" and songs.SID = words.SID `,
    (err, result) => {
      if (err) {
        res.status(401).json({ message: "fatal error" });
      } else {
        res.status(200).json({ result });
      }
    }
  );
};

export { getAllWords, getWordByID };
