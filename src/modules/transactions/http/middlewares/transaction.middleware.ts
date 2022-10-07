import { showError } from '~/middlewares';
import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

export const createdTransactionDeposit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object().shape({
    value: yup
      .number()
      .positive('Only values positive')
      .required('value is required'),
    description: yup.string().required('description is required'),
  });

  await showError(req, res, next, schema);
};

export const createdTransactionInternal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object().shape({
    value: yup
      .number()
      .positive('Only values positive')
      .required('value is required'),
    description: yup.string().required('description is required'),
    receiverAccountId: yup.string().required('receiverAccountId is required'),
  });

  await showError(req, res, next, schema);
};
