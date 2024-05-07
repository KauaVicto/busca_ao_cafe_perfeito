import { Entity } from "@core/domain/Entity";
import { Permissao } from "./Permissao";
import { Usuario } from "./Usuario";

export class Perfil extends Entity {

    public nome: string;
    public descricao: string;
    public Permissao: Permissao[];
    public Usuario: Usuario[];


    public constructor(nome: string, descricao: string, permissao: Permissao[], usuario: Usuario[], id?: string, created_at?: Date) {

        super(id, created_at)
        this.nome = nome;
        this.descricao = descricao;
        this.Permissao = permissao;
        this.Usuario = usuario;
    }
}