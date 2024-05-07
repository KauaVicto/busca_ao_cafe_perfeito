declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SERVER_PORT: number;
            JWT_SECRET_KEY: string;
            JWT_TOKEN_EXPIRES_IN: string;
        }
    }
}

export {};