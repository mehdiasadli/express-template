import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { BadRequestError } from '../errors';

const ValidationMiddleware = (schema: AnyZodObject, code?: number) => async (req: Request, _: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      params: req.params,
      query: req.query,
      body: req.body,
      headers: req.headers,
      file: req.file,
    });

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      next(
        new BadRequestError(
          error.errors[0].message,
          error.errors.map(e => e.message),
          code,
        ),
      );
    } else {
      next(error);
    }
  }
};

export { ValidationMiddleware };
