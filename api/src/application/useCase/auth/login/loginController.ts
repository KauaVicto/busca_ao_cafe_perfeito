import { Request, Response } from "express";
import { LoginUseCase } from "./loginUseCase";
import { ValidateRequestFields } from "@helpers/validateRequestFields";
import { loginBodyRequest, loginSchema } from "./loginDTO";

export class LoginController {
    private loginUseCase: LoginUseCase

    constructor(
        loginUseCase: LoginUseCase
    ) {
        this.loginUseCase = loginUseCase
    }

    public async handle(req: Request<{}, {}, loginBodyRequest>, res: Response): Promise<Response> {

        await ValidateRequestFields.validateFields(loginSchema, req.body);

        const { login, senha } = req.body;
        const token = await this.loginUseCase.execute({ login, senha })

        return res.status(201).json(token);

    }

}