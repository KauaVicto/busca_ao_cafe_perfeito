import { Entity } from "@core/domain/Entity";
import { Pessoa } from "./Pessoa";
import { Permissao } from "./Permissao";

export class Usuario extends Entity {

    public login: string;
    public senha: string;
    public situacao: boolean;
    public administrador: boolean;
    public tbpessoa_id: string;
    public pessoa?: Pessoa;
    public Permissao: Permissao[];
    

    public constructor(login: string, senha: string, situacao: boolean, administrador: boolean, tbpessoa_id: string, Permissao: Permissao[], pessoa?: Pessoa, id?: string, created_at?: Date) {
        super(id, created_at)
        this.login = login;
        this.senha = senha;
        this.situacao = situacao;
        this.administrador = administrador;
        this.pessoa = pessoa;
        this.tbpessoa_id = tbpessoa_id;
        this.Permissao = Permissao
    }
}