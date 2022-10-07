import { AppError } from '~/errors/AppError';
import { PeopleRepositoryImpl } from '~/modules/people/repositories/implementations/peopleRepositoryImpl';
import { LoggedInService } from '~/utils/functis';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayLod {
  id: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token missing');
  }
  const [, token] = authHeader.split(' ');

  try {
    const { id } = verify(token, process.env.JWT_SECRET) as IPayLod;

    const peopleRepository = new PeopleRepositoryImpl();
    const people = await peopleRepository.findPeopleById({ id });

    if (!people) {
      throw new AppError('People doesnt exist');
    }

    LoggedInService.people = people;

    next();
  } catch (error: any) {
    throw new AppError(error?.message);
  }
}
