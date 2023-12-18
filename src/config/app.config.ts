import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import router from 'routes';
import { NodeEnv, NumericString } from '../../env';
import { ErrorMiddleware, InvalidPathMiddleware } from '../middlewares';
import connectDB from './db.config';
import env from './env.config';
import { logger, stream } from './logger.config';

const BASE_URL = '/api';

class Application {
  private readonly app: express.Application;
  private readonly env: NodeEnv;
  private readonly port: NumericString;

  constructor() {
    this.app = express();
    this.env = env.NODE_ENV || 'development';
    this.port = env.PORT || 3000;

    this.registerDatabase();

    this.registerMiddlewares();
    this.registerRoutes();
    this.registerErrorHandlers();
  }

  private async registerDatabase() {
    await connectDB();
  }

  private registerMiddlewares() {
    this.app.use(morgan(env.LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: env.ORIGIN, credentials: env.CREDENTIALS }));
    this.app.use(cookieParser());
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private registerRoutes() {
    this.app.use(BASE_URL, router);
  }

  private registerErrorHandlers() {
    this.app.use(ErrorMiddleware);
    this.app.use(InvalidPathMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`========================================`);
      logger.info(`=========== ENV: ${this.env} ===========`);
      logger.info(`====== App listening on port ${this.port} ======`);
      logger.info(`========================================`);
    });
  }
}

export default new Application();
