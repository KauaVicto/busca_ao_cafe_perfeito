export class ApiError extends Error{

    public readonly statusCode: number;
    public readonly errors?: string[];

    constructor(message: string, statusCode: number, errors?: string[]){
        super(message)
        this.errors = errors;
        this.statusCode = statusCode;
    }

}

export class requestBodyError extends Error{

    public readonly statusCode: number;
    public readonly errors?: Record<string, string>;

    constructor(message: string, errors?: Record<string, string>){
        super(message)
        this.errors = errors;
        this.statusCode = 400;
    }
}

export class BadRequestError extends ApiError {

    constructor(message: string, errors?: string[]) {
        super(message, 400, errors)
    }

}

export class ConflictError extends ApiError {
    constructor(message: string, errors?: string[]) {
        super(message, 409, errors)
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string, errors?: string[]) {
        super(message, 401, errors)
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string, errors?: string[]) {
        super(message, 404, errors)
    }
}

export class ForbiddenError extends ApiError {
    constructor(message: string, errors?: string[]) {
        super(message, 403, errors)
    }
}