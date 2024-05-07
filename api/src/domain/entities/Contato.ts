import { Entity } from "@core/domain/Entity";

export class Contato extends Entity {

    public telefone: string;
    public email?: string;
    public tbpessoa_id?: string;
    

    public constructor(telefone: string, email?: string, tbpessoa_id?: string, id?: string, created_at?: Date) {
        super(id, created_at)
        this.telefone = telefone;
        this.email = email;
        this.tbpessoa_id = tbpessoa_id;
    }
}