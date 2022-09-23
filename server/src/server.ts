import "reflect-metadata";
import "@config/index";
import App from "./app";
import { myContainer } from "@dependency/inversify.config";

const app = new App(myContainer);
app.listen();
