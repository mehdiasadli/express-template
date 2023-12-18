import { StatusCodes } from '../constants/StatusCodes';
import { HttpError } from './HttpError';

export class ForbiddenError extends HttpError {
  constructor(
    public readonly message: string = 'Access denied',
    public readonly errors: string[] = [],
    public readonly code: number = 0,
    public readonly isOperational: boolean = true,
  ) {
    super('Forbidden', message, StatusCodes.FORBIDDEN, errors, code, isOperational);
  }

  public static readonly NAME: string = 'FORBIDDEN';
  public static readonly STATUS_CODE: StatusCodes = StatusCodes.FORBIDDEN;
}
