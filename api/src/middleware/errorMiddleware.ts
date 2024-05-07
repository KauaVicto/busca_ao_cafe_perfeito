import { NextFunction, Request, Response } from "express";
import { ApiError } from "@helpers/errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorMiddleware = (
    error: Error & Partial<ApiError> & Partial<PrismaClientKnownRequestError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(error.message)

    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ? error.message : 'Internal server error';
    const errors = error.errors;
    return res.status(statusCode).json({ message: message, errors })
};