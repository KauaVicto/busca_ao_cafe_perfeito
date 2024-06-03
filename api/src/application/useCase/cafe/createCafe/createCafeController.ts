import { prismaInstance } from "@core/repository/Prisma";
import { Request, Response } from "express";


interface cafeBodyRequest {
    dia: Date;
    nome: string;
    quantidade_cafe: number;
    quantidade_acucar: number;
    criador: string
    turno: number;
}


export class CreateCafeController  {

    constructor() {}

    async handle(req: Request<{}, {}, cafeBodyRequest>, res: Response) {

        const { dia, nome, criador, quantidade_acucar, quantidade_cafe, turno } = req.body

        await prismaInstance.cafe.create({
            data: {
                dia: new Date(dia),
                nome: nome,
                criador, 
                quantidade_acucar, 
                quantidade_cafe,
                turno
            }
        });

        res.status(201).json({})

    }

}