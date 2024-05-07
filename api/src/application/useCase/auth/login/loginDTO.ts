import * as Yup from 'yup';

export type loginBodyRequest = {
    login: string;
    senha: string;
}

export type loginResponse = {
    token: string;
    pessoa: {
        nome: string;
    }
}

export const loginSchema = {
    login: Yup.string().trim().required('O login é obrigatório'),
    senha: Yup.string().trim().required('A senha é obrigatória')
}