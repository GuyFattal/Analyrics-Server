import { NextFunction, Request, Response } from "express";
//asyncify chain errors in inner function to next middleware instead of throwing them.
//error handler middleware will catch them.

export const asyncify = (asyncRouteHandler: any) => {
  return (request: Request, response: Response, next: NextFunction) => {
    return asyncRouteHandler(request, response, next).catch(next);
  };
};
