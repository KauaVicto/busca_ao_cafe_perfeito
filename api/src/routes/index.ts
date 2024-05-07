import express from 'express';
import type { Router } from 'express';
import { authRouter } from './auth.routes';
import { cafeRouter } from './cafe.routes';
import { avaliacaoRouter } from './avaliacao.routes';

const router: Router = express.Router();

/* Rotas de autenticação e registro */
router.use('/auth', authRouter);

/* Rotas do café */
router.use('/cafe', cafeRouter);

/* Rotas da avaliação */
router.use('/avaliacao', avaliacaoRouter);


export { router }