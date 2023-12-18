import { StatusCodes } from '../constants/StatusCodes';
import { HttpError } from './HttpError';

export class ConflictError extends HttpError {
  constructor(
    public readonly message: string = 'Conflict happened',
    public readonly errors: string[] = [],
    public readonly code: number = 0,
    public readonly isOperational: boolean = true,
  ) {
    super('Conflict', message, StatusCodes.CONFLICT, errors, code, isOperational);
  }

  public static readonly NAME: string = 'CONFLICT';
  public static readonly STATUS_CODE: StatusCodes = StatusCodes.CONFLICT;
}
