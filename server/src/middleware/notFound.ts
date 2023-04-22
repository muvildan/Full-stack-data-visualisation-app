import { Request, Response, NextFunction } from 'express';

function notFound(
    _err: TypeError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ){
    res.status(404).send({ error: 'Not found' }).end();  
  };
  
  export default notFound;