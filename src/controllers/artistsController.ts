import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";

const getAllArtists = (req: Request, res: Response, next: NextFunction) => {
  db.query(`select * from artists`, (err, result) => {
    if (err) {
      res.status(401).json({ message: "fatal error" });
    } else {
      res.status(200).json({ result });
    }
  });
};

export { getAllArtists };
