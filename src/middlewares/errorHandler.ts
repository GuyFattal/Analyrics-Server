import { NextFunction, Response } from "express";
import { Request } from "express";
const BAD_REQUEST_FILE_FIELD_ERROR = "Unexpected field";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (err.message === BAD_REQUEST_FILE_FIELD_ERROR) {
    statusCode = 400;
  }
  res.status(statusCode).json({
    message: err.message,
    error: err,
  });
};
