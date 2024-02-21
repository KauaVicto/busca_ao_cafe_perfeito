import { IUsuarioDTO } from '../models/interfaces/usuario';
import { IPayloadToken } from '../utils/authentication/authToken';

declare namespace Express {
    interface Request {
        payload: IPayloadToken,
        usuario: IUsuarioDTO
    }
}

export {};