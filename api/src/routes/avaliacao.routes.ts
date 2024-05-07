import express from 'express';
import type { NextFunction, Request, Response, Router } from 'express';
import { FindAvaliacaoByCafeIdController, FindAvaliacaoByCafeIdParam } from '@application/useCase/avaliacao/findAvaliacaoByCafeId/findAvaliacaoByCafeIdController';

const avaliacaoRouter: Router = express.Router();

avaliacaoRouter.get('/findByCafe/:cafe_id', async (req: Request<FindAvaliacaoByCafeIdParam>, res: Response, next: NextFunction) => {
    try {
        const controller = new FindAvaliacaoByCafeIdController();

        controller.handle(req, res);

    } catch (err: any) {
        next(err)
    }
});

export { avaliacaoRouter };
