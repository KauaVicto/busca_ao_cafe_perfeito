import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@helpers/errors";
import { AuthToken, IPayload } from "@helpers/auth/authToken";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    /* Verifica se o token foi informado */
    if (!authHeader)
        return next(new UnauthorizedError('Token não informado.'));

    /* Verifica se a estrutura do token está correta */
    const parts: string[] = authHeader.split(' ');

    if (!(parts.length === 2))
        return next(new UnauthorizedError('Estrutura do token está incorreta.'));

    /* Verifica se a formatação do token está correta */
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme))
        return next(new UnauthorizedError('Token mau formatado.'));
    
    const decoded = AuthToken.verifyToken(token);

    res.locals.payload = decoded as IPayload

    next();

}