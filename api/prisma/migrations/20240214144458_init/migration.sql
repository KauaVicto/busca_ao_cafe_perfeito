-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "cafe";

-- CreateTable
CREATE TABLE "cafe"."tbcafes" (
    "id" SERIAL NOT NULL,
    "dia" TIMESTAMP(3) NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade_cafe" DOUBLE PRECISION NOT NULL,
    "quantidade_acucar" DOUBLE PRECISION NOT NULL,
    "criador" VARCHAR(40) NOT NULL,

    CONSTRAINT "tbcafes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cafe"."tbavaliacoes" (
    "id" SERIAL NOT NULL,
    "sabor" INTEGER NOT NULL,
    "intensidade" INTEGER NOT NULL,
    "doce" INTEGER NOT NULL,
    "nota_geral" INTEGER NOT NULL,
    "comentario" TEXT,
    "cafe_id" INTEGER NOT NULL,

    CONSTRAINT "tbavaliacoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cafe"."tbavaliacoes" ADD CONSTRAINT "tbavaliacoes_cafe_id_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafe"."tbcafes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
