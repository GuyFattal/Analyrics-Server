import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import db from "../utils/connection";
import mysqldump from "mysqldump";

const getBackup = (req: Request, res: Response) => {
  mysqldump({
    connection: {
      host: "sql11.freesqldatabase.com",
      user: "sql11434139",
      password: "SxjhgSCsMF",
      database: "sql11434139",
    },
    dumpToFile: "./dump.sql",
  }).then((file) => {
    res.download("./dump.sql");
  });
};

export { getBackup };
