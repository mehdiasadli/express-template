import { StatusCodes } from '../constants/StatusCodes';
import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  constructor(
    public readonly message: string = 'Resource not found',
    public readonly errors: string[] = [],
    public readonly code: number = 0,
    public readonly isOperational: boolean = true,
  ) {
    super('Not Found', message, StatusCodes.NOT_FOUND, errors, code, isOperational);
  }

  public static readonly NAME: string = 'NOT_FOUND';
  public static readonly STATUS_CODE: StatusCodes = StatusCodes.NOT_FOUND;
}
