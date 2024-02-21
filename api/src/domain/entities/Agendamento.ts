import { Entity } from "@core/domain/Entity";

export class Agendamento extends Entity {

    public data_hora: Date;
    public confirmacao: boolean;
    public cor: string;
    public paciente_id: string;
    public profissional_id: string;


    public constructor(data_hora: Date, confirmacao: boolean, cor: string, paciente_id: string, profissional_id: string, id?: string, created_at?: Date) {


        super(id, created_at)
        this.data_hora = new Date(data_hora);
        this.confirmacao = confirmacao;
        this.cor = cor;
        this.paciente_id = paciente_id;
        this.profissional_id = profissional_id;
    }
}