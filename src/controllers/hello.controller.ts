import { StatusCodes } from 'constants/StatusCodes';
import { RequestHandler } from 'express';
import { helloService } from 'services';

const GetHello: RequestHandler = (_req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ message: helloService.getHello() });
  } catch (error) {
    next(error);
  }
};

export default {
  GetHello,
};
