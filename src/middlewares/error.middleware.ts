import { ErrorRequestHandler, RequestHandler } from 'express';
import { MongooseError } from 'mongoose';
import { env, logger } from '../config';
import { StatusCodes } from '../constants/StatusCodes';
import { HttpError } from '../errors';

const DEFAULTS = {
  STATUS_CODE: StatusCodes.INTERNAL_SERVER_ERROR,
  MESSAGE: 'Something went wrong',
};

const ErrorMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
  const isDev = env.NODE_ENV === undefined || env.NODE_ENV === 'development';

  try {
    throw err instanceof HttpError
      ? err
      : err instanceof MongooseError
        ? new HttpError(err.name, err.message, StatusCodes.INTERNAL_SERVER_ERROR, [err.toString()], 0, false)
        : err instanceof Error
          ? new HttpError(err.name, err.message)
          : new HttpError();
  } catch (error: HttpError | unknown) {
    logger.error(error);

    if (error instanceof HttpError) {
      res.status(error.status).json(error.json(isDev));
    } else {
      res.status(DEFAULTS.STATUS_CODE).json({
        message: DEFAULTS.MESSAGE,
        operational: false,
        error: error?.toString() || null,
      });
    }
  }
};

const InvalidPathMiddleware: RequestHandler = async (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({ message: 'Invalid endpoint', path: req.url });
};

export { ErrorMiddleware, InvalidPathMiddleware };
