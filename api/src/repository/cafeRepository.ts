import { prismaInstance } from "@core/repository/Prisma";

export class CafeRepository {

    constructor() {}

    public async findCafeById(cafe_id: number) {
        

        const cafe: Array<any> = await prismaInstance.$queryRaw`
            SELECT 
            ca.*,
            avg(ava.nota_geral) AS nota_geral,
            count(ava.id)::Int AS total_avaliacao
            FROM cafe.tbcafes ca
            LEFT JOIN cafe.tbavaliacoes ava ON ca.id = ava.cafe_id
            WHERE ca.id = ${cafe_id}
            GROUP BY ca.id
            ORDER BY ca.dia DESC, ca.id DESC;
            `

        return cafe[0]


    }

}