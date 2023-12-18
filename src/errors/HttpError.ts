import { StatusCodes } from '../constants/StatusCodes';
import { IHttpError } from '../types/error.t';

export class HttpError extends Error implements IHttpError {
  /**
   *
   * @param {string} [name = "Http Error"] Name or title of the error
   * @param {string} [message = "Something went wrong"] Main error message
   * @param {StatusCode} [status = 500] HTTP Status Code of the error
   * @param {string[]} [errors = []] An array of error messages (For secondary information)
   * @param {number} [code = 0] A custom number for denoting the error
   * @param {boolean} [isOperational = true] Boolean value for denoting whether the error is operational or not
   */
  constructor(
    public readonly name: string = 'Http Error',
    public readonly message: string = 'Something went wrong',
    public readonly status: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,
    public readonly errors: string[] = [],
    public readonly code: number = 0,
    public readonly isOperational: boolean = true,
  ) {
    super(message);
  }

  /**
   * **HttpError.prototype.mainError**
   * A utility function to get the first error string of the `errors` array.
   *
   * @returns {string | null} First error of the `errors` array. If empty, returns `null`
   */
  public get mainError(): string | null {
    return this.errors[0] || null;
  }

  /**
   * **HttpError.prototype.json**
   * A utility function to return the info of the Error in `JSON` object format
   *
   * @param {boolean} [dev = false] If `true` – `error stack` and `isOperational` values both will be apeared on return value
   * @returns {{ name: string, message: string, status: StatusCode, errors: string[], code: number } | { name: string, message: string, status: StatusCode, errors: string[], code: number, stack: string | undefined, operational: boolean }}
   */
  public json(dev: boolean = false):
    | { name: string; message: string; status: StatusCodes; errors: string[]; code: number }
    | {
        name: string;
        message: string;
        status: StatusCodes;
        errors: string[];
        code: number;
        stack: string | undefined;
        operational: boolean;
      } {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      errors: this.errors,
      code: this.code,
      ...(dev === true ? { stack: this.stack, operational: this.isOperational } : {}),
    };
  }

  public static readonly NAME: string = 'HTTP_ERROR';
  public static readonly STATUS_CODE: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
}
