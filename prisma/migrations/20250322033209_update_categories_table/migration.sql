/*
  Warnings:

  - Added the required column `createdBy` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categories` ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    MODIFY `description` TEXT NOT NULL;
