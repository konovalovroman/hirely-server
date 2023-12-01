/*
  Warnings:

  - A unique constraint covering the columns `[company_id,is_company_owner]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_company_owner" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "users_company_id_is_company_owner_key" ON "users"("company_id", "is_company_owner");
