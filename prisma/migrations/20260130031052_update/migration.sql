/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentMethod` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverAddress` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverName` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverPhone` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `paymentMethod` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentRef` VARCHAR(191) NULL,
    ADD COLUMN `paymentStatus` VARCHAR(191) NOT NULL DEFAULT 'PAYMENT_UNPAID',
    ADD COLUMN `receiverAddress` VARCHAR(255) NOT NULL,
    ADD COLUMN `receiverName` VARCHAR(255) NOT NULL,
    ADD COLUMN `receiverPhone` VARCHAR(20) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE `order_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `orders_userId_key` ON `orders`(`userId`);

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
