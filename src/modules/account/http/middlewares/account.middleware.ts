import { showError } from '~/middlewares';
import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { messages } from '../../Messages/account';

export const createdAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object().shape({
    branch: yup.string().required(messages.validateBranchToCreateAccount),
    account: yup.string().required(messages.validateAccountToCreateAccount),
  });

  await showError(req, res, next, schema);
};
