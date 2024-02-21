import { loginController } from '../application/useCase/auth/login';
import express from 'express';
import type { NextFunction, Request, Response, Router } from 'express';
import { authMiddleware } from '@middleware/authMiddleware';

const authRouter: Router = express.Router();

/**
 * @swagger
 * /login
 */
authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await loginController.handle(req, res);
    } catch (err: any) {
        next(err)
    }
});

authRouter.post('/verify', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json(res.locals.payload)
    } catch (err: any) {
        next(err)
    }
});

export { authRouter };
