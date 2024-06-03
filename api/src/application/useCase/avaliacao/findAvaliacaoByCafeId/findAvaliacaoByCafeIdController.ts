import { prismaInstance } from "@core/repository/Prisma";
import { Request, Response } from "express";


export type FindAvaliacaoByCafeIdParam = {
    cafe_id: string
}


export class FindAvaliacaoByCafeIdController {

    constructor() {}

    async handle(req: Request<FindAvaliacaoByCafeIdParam>, res: Response) {

        const cafe_id = parseInt(req.params.cafe_id);

        const avaliacoes = await prismaInstance.avaliacao.findMany({
            where: {
                cafe_id: cafe_id
            }
        });

        res.status(200).json({ avaliacoes })

    }

}