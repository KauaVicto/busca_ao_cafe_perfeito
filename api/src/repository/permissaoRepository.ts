import { Prisma } from "@core/repository/Prisma";
import { Usuario } from "@domain/entities/Usuario";


export class PermissaoRepository extends Prisma {

    constructor() {
        super()
    }

    public async findPermissaoByPessoaId(pessoa_id: string): Promise<Usuario | null> {

        const usuario = await this.prisma.usuario.findUnique({
            where: {
                tbpessoa_id: pessoa_id
            },
            include: {
                Permissao: true
            }
        });

        if (!usuario) return null

        const objUsuario = new Usuario(
            usuario.login, 
            usuario.senha, 
            usuario.situacao, 
            usuario.tbpessoa_id, 
            usuario.Permissao, 
            undefined, 
            usuario.id, 
            usuario.created_at
        );

        return objUsuario;

    }

}