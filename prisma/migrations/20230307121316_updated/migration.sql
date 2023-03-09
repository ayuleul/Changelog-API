/*
  Warnings:

  - The values [SHIPED] on the enum `UPDATE_STATUS` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `desription` on the `UpdatePoint` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,belogsToId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `UpdatePoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UPDATE_STATUS_new" AS ENUM ('IN_PROGRESS', 'SHIPPED', 'DEPRECATE');
ALTER TABLE "Update" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Update" ALTER COLUMN "status" TYPE "UPDATE_STATUS_new" USING ("status"::text::"UPDATE_STATUS_new");
ALTER TYPE "UPDATE_STATUS" RENAME TO "UPDATE_STATUS_old";
ALTER TYPE "UPDATE_STATUS_new" RENAME TO "UPDATE_STATUS";
DROP TYPE "UPDATE_STATUS_old";
ALTER TABLE "Update" ALTER COLUMN "status" SET DEFAULT 'IN_PROGRESS';
COMMIT;

-- AlterTable
ALTER TABLE "UpdatePoint" DROP COLUMN "desription",
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_belogsToId_key" ON "Product"("id", "belogsToId");
