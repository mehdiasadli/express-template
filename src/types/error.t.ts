import { StatusCodes } from '../constants/StatusCodes';

export interface IHttpError {
  name: string;
  message: string;
  errors: string[];
  code: number;
  status: StatusCodes;
  stack?: string;
  isOperational: boolean;
}
