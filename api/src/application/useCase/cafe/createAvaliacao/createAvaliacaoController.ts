import { Prisma } from "@core/repository/Prisma";
import { Request, Response } from "express";


interface avaliacaoBodyRequest {
    sabor: number
    intensidade: number
    doce: number
    nota_geral: number
    comentario: string
    cafe_id: number
}


export class CreateAvaliacaoController extends Prisma {

    constructor() {
        super()
    }

    async handle(req: Request<{}, {}, avaliacaoBodyRequest>, res: Response) {

        const { comentario, doce, intensidade, nota_geral, sabor, cafe_id } = req.body

        await this.prisma.avaliacao.create({
            data: {
                doce,
                intensidade,
                nota_geral,
                sabor,
                cafe_id,
                comentario
            }
        });

        res.status(201).json({})

    }

}