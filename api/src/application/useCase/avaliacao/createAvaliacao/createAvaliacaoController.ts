import { prismaInstance } from "@core/repository/Prisma";
import { Request, Response } from "express";
import { CafeRepository } from "src/repository/cafeRepository";


interface avaliacaoBodyRequest {
    sabor: number
    intensidade: number
    doce: number
    nota_geral: number
    comentario: string
    cafe_id: number
}


export class CreateAvaliacaoController {

    constructor() {}

    async handle(req: Request<{}, {}, avaliacaoBodyRequest>, res: Response) {

        const { comentario, doce, intensidade, nota_geral, sabor, cafe_id } = req.body

        await prismaInstance.avaliacao.create({
            data: {
                doce,
                intensidade,
                nota_geral,
                sabor,
                cafe_id,
                comentario
            }
        });

        const cafeRepository = new CafeRepository()

        const cafe = await cafeRepository.findCafeById(cafe_id)

        res.status(201).json({cafe})

    }

}