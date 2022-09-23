// file inversify.config.ts

import IndexController from "@/controllers/IndexController";
import CS697ScraperController from "@/controllers/ScraperController";
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
  .bind<CS697ScraperService>(DEPENDENCY_TYPES.ScraperService)
  .to(CS697ScraperService);
myContainer
  .bind<CS697ScraperController>(DEPENDENCY_TYPES.CS697ScraperController)
  .to(CS697ScraperController);

export { myContainer };
