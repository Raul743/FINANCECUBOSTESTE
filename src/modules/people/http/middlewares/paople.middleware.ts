import { showError } from '~/middlewares';
import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { messages } from '../../Messages/people';

export const createdPeaple = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = yup.object().shape({
    name: yup.string().required(messages.validateNameToCreatePeaple),
    document: yup.string().required(messages.validateDocumentToCreatePeaple),
    password: yup.string().required(messages.validatePasswordToCreatePeaple),
  });

  await showError(req, res, next, schema);
};
