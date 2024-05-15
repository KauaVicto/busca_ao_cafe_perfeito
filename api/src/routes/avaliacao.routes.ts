import express from 'express';
import type { NextFunction, Request, Response, Router } from 'express';
import { FindAvaliacaoByCafeIdController, FindAvaliacaoByCafeIdParam } from '@application/useCase/avaliacao/findAvaliacaoByCafeId/findAvaliacaoByCafeIdController';
import { CreateAvaliacaoController } from '@application/useCase/avaliacao/createAvaliacao/createAvaliacaoController';

const avaliacaoRouter: Router = express.Router();

avaliacaoRouter.get('/findByCafe/:cafe_id', async (req: Request<FindAvaliacaoByCafeIdParam>, res: Response, next: NextFunction) => {
    try {
        const controller = new FindAvaliacaoByCafeIdController();

        controller.handle(req, res);

    } catch (err: any) {
        next(err)
    }
});

avaliacaoRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {


        const controller = new CreateAvaliacaoController();

        controller.handle(req, res);



    } catch (err: any) {
        next(err)
    }
});

export { avaliacaoRouter };
