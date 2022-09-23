import { PoolOptions } from "sequelize";
import { logger } from "@utils/logger";

const connectionPoolOptions: PoolOptions = {
  min: 2,
  max: 5,
  idle: 30000,
  acquire: 60000,
};

const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: logger.info.bind(logger),
  pool: connectionPoolOptions,
};

const test = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: logger.info.bind(logger),
  pool: connectionPoolOptions,
};

const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  pool: connectionPoolOptions,
};

const config = {
  development,
  test,
  production,
};

module.exports = config;
