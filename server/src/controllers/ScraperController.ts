import { OK } from "@/config/common";
import { DEPENDENCY_TYPES } from "@/dependency/types";
import { IScraper } from "@/interfaces/scraper";
import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet } from "inversify-express-utils";

@controller("/data")
export default class CS697ScraperController {
  constructor(
    @inject(DEPENDENCY_TYPES.ScraperService) private scraperService: IScraper,
  ) {}

  /**
   * A handler for scraping data from the CS697 page
   * @param _ Request - the express request object
   * @param res Response - the express response object
   * @param next NextFunction - the express NextFunction
   * @returns
   * Status OK (200) - a JSON payload containing the scraped data. The data is an
   * array of objects, each object representing a row in the table. Example:
   *
   * {
   *  "language": "C++",
   *  "level": 3,
   *  "averageSourceStatements": 0.5
   * }
   *
   * Status Internal Server Error (500) - a JSON payload containing the error message
   * (handled by the error handler middleware)
   */
  @httpGet("/")
  public async get(_: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.scraperService.scrape();
      return res.status(OK).json({
        message: "Success",
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
