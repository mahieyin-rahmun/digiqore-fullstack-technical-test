import { OK } from "@/config/common";
import IndexService from "@services/IndexService";
import { Request, Response, NextFunction } from "express";

// the basic controller for bootstrapping purposes
class IndexController {
  constructor(private _indexService: IndexService) {}

  /**
   * A basic handler method to greet the user
   * @param _ Request - the express request object
   * @param res Response - the express response object
   * @param next NextFunction - the express NextFunction
   * @returns
   * Status OK (200) - a JSON payload containing the greeting message
   * Status Internal Server Error (500) - a JSON payload containing the error message
   * (handled by the error handler middleware)
   */
  public async index(
    _: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const data = this._indexService.greet();
      return res.status(OK).json({
        message: "Success",
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default IndexController;
