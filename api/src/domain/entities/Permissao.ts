import { Entity } from "@core/domain/Entity";

export class Permissao extends Entity {

    public codigo: string;
    public descricao: string;
    public endpoint: string;
    

    public constructor(codigo: string, descricao: string, endpoint: string, id?: string, created_at?: Date) {
        super(id, created_at)
        this.codigo = codigo;
        this.descricao = descricao;
        this.endpoint = endpoint;
    }
}