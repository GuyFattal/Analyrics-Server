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

export { getAllGroups };
