// file inversify.config.ts

import IndexController from "@/controllers/IndexController";
import { IScraper } from "@/interfaces/scraper";
import IndexService from "@/services/IndexService";
import { CS697ScraperService } from "@/services/ScraperService";
import { SeleniumDriverService } from "@/services/SeleniumDriverService";
import { Container } from "inversify";
import { DEPENDENCY_TYPES } from "./types";

const myContainer = new Container();
myContainer
  .bind<IndexController>(DEPENDENCY_TYPES.IndexController)
  .to(IndexController);
myContainer.bind<IndexService>(DEPENDENCY_TYPES.IndexService).to(IndexService);
myContainer
  .bind<SeleniumDriverService>(DEPENDENCY_TYPES.SeleniumDriverService)
  .to(SeleniumDriverService)
  .inSingletonScope();
myContainer
  .bind<IScraper>(DEPENDENCY_TYPES.ScraperService)
  .to(CS697ScraperService);

export { myContainer };
