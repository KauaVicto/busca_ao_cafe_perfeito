-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "cadastro";

-- CreateTable
CREATE TABLE "cadastro"."tbusuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(40) NOT NULL,
    "email" VARCHAR(40) NOT NULL,
    "telefone" CHAR(11) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,

    CONSTRAINT "tbusuarios_pkey" PRIMARY KEY ("id")
);
