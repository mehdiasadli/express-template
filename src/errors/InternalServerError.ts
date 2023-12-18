import { StatusCodes } from '../constants/StatusCodes';
import { HttpError } from './HttpError';

export class InternalServerError extends HttpError {
  constructor(
    public readonly message: string = 'Server error occured',
    public readonly errors: string[] = [],
    public readonly code: number = 0,
    public readonly isOperational: boolean = true,
  ) {
    super('Internal Server Error', message, StatusCodes.INTERNAL_SERVER_ERROR, errors, code, isOperational);
  }

  public static readonly NAME: string = 'INTERNAL_SERVER_ERROR';
  public static readonly STATUS_CODE: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
}
