/*
  Warnings:

  - You are about to alter the column `premiumCategory` on the `premiumcategories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - Added the required column `description` to the `premiumCategories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `premiumcategories` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    MODIFY `premiumCategory` ENUM('BASIC', 'PREMIUM', 'PREMIUM_PLUS') NOT NULL;
