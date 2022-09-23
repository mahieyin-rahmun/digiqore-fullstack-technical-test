import { NextFunction, Request, Response } from "express";
import { HttpException } from "@utils/exceptions";
import { logger } from "@utils/logger";
import { INTERNAL_SERVER_ERROR } from "@/config/common";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status: number = error.status || INTERNAL_SERVER_ERROR;
    const message: string = error.message || "Something went wrong";

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`,
    );
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
