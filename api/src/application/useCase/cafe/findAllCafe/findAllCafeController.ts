import { prismaInstance } from "@core/repository/Prisma";
import { Request, Response } from "express";


export class FindAllCafeController {

    constructor() {}

    async handle(req: Request, res: Response) {


        const cafes = await prismaInstance.$queryRaw`
            SELECT 
            ca.*,
            avg(ava.nota_geral) AS nota_geral,
            count(ava.id)::Int AS total_avaliacao
            FROM cafe.tbcafes ca
            LEFT JOIN cafe.tbavaliacoes ava ON ca.id = ava.cafe_id
            GROUP BY ca.id
            ORDER BY ca.dia DESC, ca.id DESC;
            `

        res.status(200).json({cafes: cafes})

    }

}