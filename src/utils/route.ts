import { RequestHandler, Router } from 'express';
import { UploadMiddleware, ValidationMiddleware } from 'middlewares';
import { AnyZodObject } from 'zod';

interface ExpressRouter {
  handler: RequestHandler;
  path?: string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head' | 'trace' | 'all';
  middlewares?: RequestHandler[];
  validation?: AnyZodObject[] | AnyZodObject;
  image?: boolean;
  group?: string;
}

interface Group {
  name: string;
  options: Omit<ExpressRouter, 'path' | 'handler'> & { prefix?: string };
}

export const route = (routes: ExpressRouter[], groups: Group[] = []) => {
  const router = Router();

  routes.forEach(route => {
    let { handler, path = '/', method = 'get', middlewares = [], validation = [], image = false } = route;

    if (route.group !== null) {
      const group = groups.find(g => g.name === route.group);

      if (group) {
        path = !group.options.prefix ? path : group.options.prefix + path;
        method = group.options.method || method;
        middlewares = group.options.middlewares || middlewares;
        image = group.options.image || image;
        validation = group.options.validation || validation;
      }
    }

    let authMiddlewares: RequestHandler[] = [],
      validationMiddlewares: RequestHandler[] = [],
      imageMiddleware: RequestHandler[] = [];

    if (validation || (Array.isArray(validation) && validation.length !== 0)) {
      validationMiddlewares = Array.isArray(validation)
        ? validation.map(zodObject => ValidationMiddleware(zodObject))
        : [ValidationMiddleware(validation)];
    }

    if (image) {
      imageMiddleware = [UploadMiddleware.single('image')];
    }

    router[method](path, [...authMiddlewares, ...imageMiddleware, ...validationMiddlewares, ...middlewares], handler);
  });

  return router;
};

export const generateAppRoutes = (routers: [string, Router, RequestHandler[]?][]) => {
  const router = Router();

  routers.forEach(r => {
    router.use(r[0], ...(r[2]?.length ? r[2] : []), r[1]);
  });

  return router;
};
