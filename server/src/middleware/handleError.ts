import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../models/customErrorsModel';

//Custom error handler to standardize error objects returned
function handleError(
    err: TypeError | CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    let customError = err;
  
    if (!(err instanceof CustomError) && err.name === 'CastError') {
        customError = new CustomError('Invalid id', 400);
        res.status(400).send({ error: 'malformatted id' });
    } 
    else if (!(err instanceof CustomError) && err.name === 'ValidationError') {
        customError = new CustomError(
            'Oh no, this is embarrasing. We are experiencing some issues with our servers. Please try again later.'
      );
      res.status(500).send({ error: 'Internal server error' });
    }
    res.status((customError as CustomError).status).send(customError).end();
  };
  
  export default handleError;
