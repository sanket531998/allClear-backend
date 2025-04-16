/*
  Warnings:

  - You are about to drop the column `autor` on the `articles` table. All the data in the column will be lost.
  - Added the required column `author` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `articles` DROP COLUMN `autor`,
    ADD COLUMN `author` VARCHAR(191) NOT NULL;
