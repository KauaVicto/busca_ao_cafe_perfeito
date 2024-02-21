import express from 'express';
import type { Router } from 'express';
import { authRouter } from './auth.routes';
import { authMiddleware } from '@middleware/authMiddleware';
import { cafeRouter } from './cafe.routes';

const router: Router = express.Router();

/* Rotas de autenticação e registro */
router.use('/auth', authRouter);

/* Rotas de autenticação e registro */
router.use('/cafe', cafeRouter);


export { router }