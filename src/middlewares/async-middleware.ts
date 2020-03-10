import { Request, Response, NextFunction, RequestHandler } from 'express';

export default (middleware: RequestHandler): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        middleware(req, res, next).catch(next);
    };
};
