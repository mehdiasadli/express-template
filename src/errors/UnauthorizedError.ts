import { StatusCodes } from '../constants/StatusCodes';
import { HttpError } from './HttpError';

export class UnauthorizedError extends HttpError {
  constructor(
    public readonly message: string = 'Unauthorized',
    public readonly errors: string[] = [],
    public readonly code: number = 0,
    public readonly isOperational: boolean = true,
  ) {
    super('Unauthorized', message, StatusCodes.UNAUTHORIZED, errors, code, isOperational);
  }

  public static readonly NAME: string = 'UNAUTHORIZED';
  public static readonly STATUS_CODE: StatusCodes = StatusCodes.UNAUTHORIZED;
}
