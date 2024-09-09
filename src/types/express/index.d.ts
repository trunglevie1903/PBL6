declare namespace Express {
  interface Request {
    user?: {
      userId: string
    };
    file?: any;
  }
}