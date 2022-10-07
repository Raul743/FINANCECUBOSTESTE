import { showError } from '~/middlewares';
import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

export const loginMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object().shape({
    document: yup.string().required('o document is required'),
    password: yup.string().min(6).required('a senha is required'),
  });

  await showError(req, res, next, schema);
};
