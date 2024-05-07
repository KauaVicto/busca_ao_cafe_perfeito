import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { ApiError, UnauthorizedError } from '../errors';


export type IPayload = {
    sub: string;
    nome: string;
    iat?: number;
    exp?: number;
}

export class AuthToken {
    
    static createToken(payload: IPayload): string {
        const options: jwt.SignOptions = {
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);

        return token;
    }

    static verifyToken(token: string): string | JwtPayload | undefined {
        const secretKey: string = process.env.JWT_SECRET_KEY;

        try {
            const decoded = jwt.verify(token, secretKey);

            return decoded;
        }catch(err: any){
            if (err instanceof TokenExpiredError){
                throw new UnauthorizedError('Token expirado');
            } else {
                throw new UnauthorizedError('Token inválido');
            }
        }
 
    }
    
}