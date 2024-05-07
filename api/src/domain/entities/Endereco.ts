import { Entity } from "@core/domain/Entity";

export class Endereco extends Entity {

    public rua: string;
    public bairro: string;
    public cidade: number;
    public uf: number;
    public cep: string;
    public numero: string;
    public tbpessoa_id?: string;

    public constructor(rua: string, bairro: string, cidade: number, uf: number, cep: string, numero: string, tbpessoa_id?: string, id?: string, created_at?: Date) {
        super(id, created_at)
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.cep = cep;
        this.numero = numero;
        this.tbpessoa_id = tbpessoa_id;
    }
}