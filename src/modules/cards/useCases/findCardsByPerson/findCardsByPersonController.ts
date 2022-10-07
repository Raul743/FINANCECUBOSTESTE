import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindCardsByPersonUseCase } from './findCardByPersonUseCase';

class FindCardsByPersonController {
  async handle(
    req: Request<
      any,
      any,
      any,
      { itemsPerPage?: number; currentPage?: number }
    >,
    res: Response
  ) {
    const useCase = container.resolve(FindCardsByPersonUseCase);

    const cards = await useCase.execute(req.query);

    return res.status(200).json({
      ...cards,
    });
  }
}

export { FindCardsByPersonController };
