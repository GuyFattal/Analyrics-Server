import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllSongs = (req: Request, res: Response, next: NextFunction) => {
  db.query("select * from songs", (err, result) => {
    if (err) console.log(err.message);
    res.status(200).json({ data: result });
  });
};
const saveNewSong = (req: Request, res: Response, next: NextFunction) => {};

export { saveNewSong, getAllSongs };
