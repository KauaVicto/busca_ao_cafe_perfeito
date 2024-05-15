import { CreateCafeController } from '@application/useCase/cafe/createCafe/createCafeController';
import express from 'express';
import type { NextFunction, Request, Response, Router } from 'express';
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

export { cafeRouter };
