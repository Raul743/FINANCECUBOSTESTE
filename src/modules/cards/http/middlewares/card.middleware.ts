import { showError } from '~/middlewares';
import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { messages } from '../../Messages/card';

export const createdCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object().shape({
    type: yup.string().required(messages.validateTypeToCreateCard),
    number: yup.string().required(messages.validateNumberToCreateCard),
    cvv: yup.string().required(messages.validateCVVToCreateCard),
  });

  await showError(req, res, next, schema);
};
