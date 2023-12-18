import { StatusCodes } from '../constants/StatusCodes';
import { HttpError } from './HttpError';

export class BadRequestError extends HttpError {
  constructor(
    public readonly message: string = 'Bad request',
    public readonly errors: string[] = [],
    public readonly code: number = 0,
    public readonly isOperational: boolean = true,
  ) {
    super('Bad Request', message, StatusCodes.BAD_REQUEST, errors, code, isOperational);
  }

  public static readonly NAME: string = 'BAD_REQUEST';
  public static readonly STATUS_CODE: StatusCodes = StatusCodes.BAD_REQUEST;
}
