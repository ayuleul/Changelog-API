import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

interface IRequest extends Request {
  user?: any;
}

export type MiddlewareFn = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => void;

export type RequestFn = (req: IRequest, res: Response) => void;

export type ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => any;
