import { Pessoa } from "@domain/entities/Pessoa";
import { loginBodyRequest, loginResponse } from "@application/useCase/auth/login/loginDTO";
import { Prisma } from "@core/repository/Prisma";
import { UnauthorizedError } from "@helpers/errors";
import { cryptPassword } from "@helpers/auth/password";
import { AuthToken } from "@helpers/auth/authToken";
import { Usuario } from "@domain/entities/Usuario";


export class LoginUseCase extends Prisma {

    constructor(
    ) {
        super()
    }

    async execute(body: loginBodyRequest): Promise<loginResponse> {

        const { login, senha } = body;

        const usuario: Usuario = await this.prisma.usuario.findUnique({
            where: {
                login: login
            },
            include: {
                pessoa: true
            }
        }) as Usuario

        if (!usuario)
            throw new UnauthorizedError('Email ou senha incorreto.');

        if (!await cryptPassword.compare(senha, usuario.senha))
            throw new UnauthorizedError('Email ou senha incorreto.');

        const token = AuthToken.createToken({
            sub: usuario.pessoa.id,
            nome: usuario.pessoa.nome
        });

        return {
            token,
            pessoa: {
                nome: usuario.pessoa.nome
            }
        }

    }
}