declare global {
  namespace Express {
    export interface Request {
      user?: any;
    }
    export interface RequestHandler {
      user?: any;
    }
  }
}

export {};
