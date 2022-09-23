// file inversify.config.ts

import IndexController from "@/controllers/IndexController";
import IndexService from "@/services/IndexService";
import { Container } from "inversify";
import { DEPENDENCY_TYPES } from "./types";

const myContainer = new Container();
myContainer
  .bind<IndexController>(DEPENDENCY_TYPES.IndexController)
  .to(IndexController);
myContainer.bind<IndexService>(DEPENDENCY_TYPES.IndexService).to(IndexService);

export { myContainer };
