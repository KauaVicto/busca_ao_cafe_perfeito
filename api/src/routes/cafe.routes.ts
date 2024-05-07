import { CreateCafeController } from '@application/useCase/cafe/createCafe/createCafeController';
import { loginController } from '../application/useCase/auth/login';
import express from 'express';
import type { NextFunction, Request, Response, Router } from 'express';
import { CreateAvaliacaoController } from '@application/useCase/cafe/createAvaliacao/createAvaliacaoController';
import { FindAllCafeController } from '@application/useCase/cafe/findAllCafe/findAllCafeController';
import { FindAvgIntensidadeDoceController } from '@application/useCase/cafe/findAvgIntensidadeDoce/findAvgIntensidadeDoceController';

const cafeRouter: Router = express.Router();

cafeRouter.get('/findall', async (req: Request, res: Response, next: NextFunction) => {
    try {


        const controller = new FindAllCafeController();

        controller.handle(req, res);



    } catch (err: any) {
        next(err)
    }
});

cafeRouter.get('/findIntensidadeDoce', async (req: Request, res: Response, next: NextFunction) => {
    try {


        const controller = new FindAvgIntensidadeDoceController();

        controller.handle(req, res);



    } catch (err: any) {
        next(err)
    }
});

cafeRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {


        const controller = new CreateCafeController();

        controller.handle(req, res);



    } catch (err: any) {
        next(err)
    }
});

cafeRouter.post('/avaliacao/create', async (req: Request, res: Response, next: NextFunction) => {
    try {


        const controller = new CreateAvaliacaoController();

        controller.handle(req, res);



    } catch (err: any) {
        next(err)
    }
});

export { cafeRouter };
