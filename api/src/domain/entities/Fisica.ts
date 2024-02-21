import { Entity } from "@core/domain/Entity";

export class Fisica extends Entity {

    public cpf: string;
    public sexo: string;
    public data_nascimento: Date;
    public sus: string;
    public estado_civil: number;
    public raca_cor: number;
    public naturalidade: number;
    public filiacao: string;
    public tbpessoa_id?: string;



    public constructor(
        cpf: string,
        sexo: string,
        data_nascimento: Date,
        sus: string,
        estado_civil: number,
        raca_cor: number,
        naturalidade: number,
        filiacao: string,
        tbpessoa_id?: string, 
        id?: string, 
        created_at?: Date
    ) {
        super(id, created_at)
        this.cpf = cpf;
        this.sexo = sexo;
        this.data_nascimento = new Date(data_nascimento);
        this.sus = sus;
        this.estado_civil = estado_civil;
        this.raca_cor = raca_cor;
        this.naturalidade = naturalidade;
        this.filiacao = filiacao;
        this.tbpessoa_id = tbpessoa_id;
    }
}