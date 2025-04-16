/*
  Warnings:

  - The primary key for the `premiumcategories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `premiumCategoriesType` on the `premiumcategories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[premiumCategory]` on the table `premiumCategories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `premiumCategoriesTypeId` to the `premiumCategories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `premiumcategories` DROP PRIMARY KEY,
    DROP COLUMN `premiumCategoriesType`,
    ADD COLUMN `premiumCategoriesTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`premiumCategoriesTypeId`);

-- CreateIndex
CREATE UNIQUE INDEX `premiumCategories_premiumCategory_key` ON `premiumCategories`(`premiumCategory`);
