import DB from "@models/index";
import { LOG_FORMAT, ORIGIN, CREDENTIALS } from "@config/index";
import compression from "compression";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { logger, stream } from "@utils/logger";
import { NOT_FOUND, OK } from "@config/common";
import errorMiddleware from "./middlewares/error.middleware";

export default class App {
  private app: express.Application;
  public env: string;
  public port: string | number;

  constructor(
    env: string = process.env.NODE_ENV || "development",
    port: string | number = process.env.PORT || 3000,
  ) {
    this.env = env;
    this.port = port;

    this.app = express();

    this.connectToDatabase();
    this.initializeMiddlewares(this.app);
    this.initializeRoutes(this.app);
    this.initializeErrorHandler(this.app);
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

  private initializeRoutes(app: express.Application) {
    app
      .route("/api/v1/data")
      .get((_: Request, res: Response, __: NextFunction) => {
        return res.status(OK).json({
          data: "Hello world from scraper",
          message: "Success",
        });
      });

    app.route("*").all((req: Request, res: Response) => {
      return res.status(NOT_FOUND).json({
        data: `The requested resource at ${req.url} was not found`,
        message: "Error",
      });
    });
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
