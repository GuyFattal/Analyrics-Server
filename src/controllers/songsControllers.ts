import { Request, Response, NextFunction } from "express";
import { parseTxt } from "../utils/parsing";
import db from "../utils/connection";

const getAllSongs = (req: Request, res: Response, next: NextFunction) => {
  db.query("select * from songs", (err, result) => {
    if (err) console.log(err.message);
    res.status(200).json({ data: result });
  });
};
const saveNewSong = (req: Request, res: Response, next: NextFunction) => {
  const { text } = req.body;
  parseTxt(text);
  //   db.query(
  //     `insert into songs values(3,"aa",1990,"lllalalal","jazz") `,
  //     (err, result) => {
  //       if (err) console.log(err.message);
  //       else console.log(result);
  //       res.status(200).json({ data: result });
  //     }
  //   );
};

export { saveNewSong, getAllSongs };
