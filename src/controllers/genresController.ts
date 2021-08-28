import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllGenres = (req: Request, res: Response, next: NextFunction) => {
  db.query(`select * from genres`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error" });
    } else {
      res.status(200).json({ result });
    }
  });
};

export { getAllGenres };
