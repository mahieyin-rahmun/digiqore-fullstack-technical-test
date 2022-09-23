import "reflect-metadata";
import { describe, expect, test } from "@jest/globals";
import { CS697ScraperService } from "../services/ScraperService";
import { SeleniumDriverService } from "../services/SeleniumDriverService";

describe("test scraper service", () => {
  const driverService = new SeleniumDriverService();
  const scraper = new CS697ScraperService(driverService);

  test("should scrape data", (done) => {
    scraper
      .scrape()
      .then((data) => {
        expect(data.length).toBeGreaterThan(0);
        expect(Object.keys(data[0])).toEqual([
          "language",
          "level",
          "averageSourceStatements",
        ]);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
