import { NOT_FOUND } from "@config/common";
import { Request, Response, NextFunction } from "express";

// the controller for handling non-existent route outside the API spec
class InvalidRouteController {
  /**
   * A basic handler method to greet the user
   * @param req Request - the express request object
   * @param res Response - the express response object
   * @param next NextFunction - the express NextFunction
   * @returns
   * Status NOT_FOUND (404) - a JSON payload containing the error message that the requested URL was not found
   * Status Internal Server Error (500) - a JSON payload containing the error message
   * (handled by the error handler middleware)
   */
  public async invalidRoute(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(NOT_FOUND).json({
        data: `The requested resource at ${req.url} was not found`,
        message: "Error",
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default InvalidRouteController;
