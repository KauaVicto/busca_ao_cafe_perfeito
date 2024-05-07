import { Entity } from "@core/domain/Entity";
import { Usuario } from "./Usuario";
import { Endereco } from "./Endereco";
import { Contato } from "./Contato";
import { Fisica } from "./Fisica";

export class Pessoa extends Entity {

    public nome: string;
    public origem_gravacao: string;
    public usuario?: Usuario;
    public endereco?: Endereco;
    public contato?: Contato;
    public fisica?: Fisica


    public constructor(
        nome: string,
        origem_gravacao: string,
        usuario?: Usuario,
        endereco?: Endereco,
        contato?: Contato,
        fisica?: Fisica,
        id?: string,
        created_at?: Date
    ) {
        super(id, created_at)
        this.nome = nome;
        this.origem_gravacao = origem_gravacao;
        this.usuario = usuario;
        this.endereco = endereco;
        this.contato = contato;
        this.fisica = fisica;
    }
}