/*
  Warnings:

  - Added the required column `sabor` to the `tbavaliacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cafe"."tbavaliacoes" ADD COLUMN     "sabor" DOUBLE PRECISION NOT NULL;
