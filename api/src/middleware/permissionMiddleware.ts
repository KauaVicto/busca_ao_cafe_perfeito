import { ForbiddenError } from "@helpers/errors";
import { NextFunction, Request, Response } from "express";
import { PermissaoRepository } from "src/repository/permissaoRepository";

export const permissionMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const permissaoRepository = new PermissaoRepository();

    const pessoaId: string = res.locals.payload.sub;

    const usuario = await permissaoRepository.findPermissaoByPessoaId(pessoaId);

    
    if (!usuario)
        return next(new ForbiddenError('Você não tem permissão para executar esse comando.'));

    if (usuario.administrador)
        return next();

    // Verifica se o usuário possui permissão para executar o endpoint
    if (!usuario.Permissao.some(value => value.endpoint === req.originalUrl))
        return next(new ForbiddenError('Você não tem permissão para executar esse comando.'));

    return next();
}