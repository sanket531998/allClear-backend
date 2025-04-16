-- CreateTable
CREATE TABLE `articles` (
    `articlesId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `autor` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `categoryType` INTEGER NOT NULL,
    `addedBy` INTEGER NOT NULL,
    `premiumCategoryType` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `totalReads` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`articlesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_categoryType_fkey` FOREIGN KEY (`categoryType`) REFERENCES `categories`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_addedBy_fkey` FOREIGN KEY (`addedBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_premiumCategoryType_fkey` FOREIGN KEY (`premiumCategoryType`) REFERENCES `premiumCategories`(`premiumCategoriesTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;
