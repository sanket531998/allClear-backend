-- CreateTable
CREATE TABLE `PremiumCategories` (
    `premiumCategoriesType` INTEGER NOT NULL AUTO_INCREMENT,
    `premiumCategory` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`premiumCategoriesType`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
