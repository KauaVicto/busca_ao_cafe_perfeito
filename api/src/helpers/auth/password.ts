import bcrypt from 'bcryptjs';

type callbackCheckPassword = (error: string[]) => void;

export class cryptPassword {

    /**
     * Método responsável por encriptar senha
     * @param senha 
     * @returns 
     */
    static async encode (senha: string): Promise<string> {
        const QTD_CRYPT = 10;
        const senhaHash = await bcrypt.hash(senha, QTD_CRYPT);

        return senhaHash;
    }

    /**
     * Método responsável por verificar se a senha é válida
     * @param senha 
     * @param hash 
     * @returns 
     */
    static async compare (senha: string, hash: string): Promise<boolean> {
        if(!await bcrypt.compare(senha, hash))
            return false;

        return true;
    }

    /**
     * Método responsável por checar se a senha segue todos os padrões de segurança
     * @param senha 
     * @returns 
     */
    static checkPasswordSecurity (senha: string, callback: callbackCheckPassword): void {

        const errors: string[] = [];
        if (senha.length < 8)
            errors.push('A senha deve conter no mínimo 8 caracteres');
            
        if (!(/[A-Z]/.test(senha)))
            errors.push('A senha deve conter letras maiúsculas');

        if (!(/[a-z]/.test(senha)))
            errors.push('A senha deve conter letras minúsculas');

        if (!(/[0-9]/.test(senha)))
            errors.push('A senha deve conter números');

        callback(errors)
    }
};