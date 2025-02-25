/*
  Warnings:

  - A unique constraint covering the columns `[firbaseUid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firbaseUid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ADD COLUMN     "firbaseUid" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq'),
ALTER COLUMN "password" SET DATA TYPE TEXT;
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- CreateIndex
CREATE UNIQUE INDEX "User_firbaseUid_key" ON "User"("firbaseUid");
