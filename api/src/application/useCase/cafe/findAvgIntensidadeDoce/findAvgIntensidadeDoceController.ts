import { Prisma } from "@core/repository/Prisma";
import { Request, Response } from "express";
import moment, { Moment } from "moment";

type resBodyCafe = {
    id: number;
    criador: string;
    dia: string;
    intensidade: number;
    docura: number
}

export class FindAvgIntensidadeDoceController extends Prisma {

    constructor() {
        super()
    }

    async handle(req: Request, res: Response) {


        const cafes: Array<resBodyCafe> = await this.prisma.$queryRaw`
            SELECT 
            ca.*,
            avg(ava.intensidade) AS intensidade,
            avg(ava.doce) AS docura
            FROM cafe.tbcafes ca
            LEFT JOIN cafe.tbavaliacoes ava ON ca.id = ava.cafe_id
            GROUP BY ca.id
            ORDER BY ca.dia DESC, ca.id DESC;
            `

        const response = cafes.map(cafe => {
            return {
                id: cafe.id,
                criador: cafe.criador,
                dia: moment.utc(cafe.dia).format('YYYY-MM-DD HH:mm:ss'),
                intensidade: cafe.intensidade ? parseFloat(cafe.intensidade.toFixed(2)) : 3.0,
                docura: cafe.docura ? parseFloat(cafe.docura.toFixed(2)) : 3.0
            }
        })

        res.status(200).json({cafes: response})

    }

}