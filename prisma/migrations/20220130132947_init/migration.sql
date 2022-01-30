/*
  Warnings:

  - You are about to drop the column `is` on the `Letter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Letter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Letter" DROP COLUMN "is",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Word_name_key" ON "Word"("name");
