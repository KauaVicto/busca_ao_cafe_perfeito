/*
  Warnings:

  - You are about to drop the column `sabor` on the `tbavaliacoes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cafe"."tbavaliacoes" DROP COLUMN "sabor",
ALTER COLUMN "intensidade" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "doce" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "nota_geral" SET DATA TYPE DOUBLE PRECISION;
