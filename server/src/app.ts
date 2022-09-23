import DB from "@models/index";
import { LOG_FORMAT, ORIGIN, CREDENTIALS } from "@config/index";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { logger, stream } from "@utils/logger";
import errorMiddleware from "./middlewares/error.middleware";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import InvalidRouteController from "./controllers/InvalidRouteContoller";

export default class App {
  private container: Container;
  private server: InversifyExpressServer;
  private app: express.Application;
  public env: string;
  public port: string | number;

  constructor(
    container: Container,
    env: string = process.env.NODE_ENV || "development",
    port: string | number = process.env.PORT || 3000,
  ) {
    this.env = env;
    this.port = port;
    this.container = container;

    this.server = new InversifyExpressServer(this.container, null, {
      rootPath: "/api/v1",
    });

    this.connectToDatabase();
    this.server.setConfig((app: express.Application) => {
      this.initializeMiddlewares(app);
    });

    this.server.setErrorConfig((app: express.Application) => {
      this.initializeErrorHandler(app);
    });

    this.app = this.server.build();

    // invalid route handler doesn't work with dependency injection 🥲
    const invalidRouteController = new InvalidRouteController();
    this.app.route("*").all(invalidRouteController.invalidRoute);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getApp() {
    return this.app;
  }

  private connectToDatabase() {
    DB.sequelize
      .authenticate()
      .then(() => logger.info("Database authenticated successfully"))
      .catch((err: Error) => logger.error(err.message));
  }

  private initializeMiddlewares(app: express.Application) {
    app.use(morgan(LOG_FORMAT!, { stream }));
    app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    app.use(hpp());
    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private initializeErrorHandler(app: express.Application) {
    app.use(errorMiddleware);
  }
}
