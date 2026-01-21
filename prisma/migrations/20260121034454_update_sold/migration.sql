/*
  Warnings:

  - Made the column `detailDesc` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shortDesc` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `factory` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `target` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `detailDesc` TEXT NOT NULL,
    MODIFY `shortDesc` VARCHAR(255) NOT NULL,
    MODIFY `sold` INTEGER NULL DEFAULT 0,
    MODIFY `factory` VARCHAR(100) NOT NULL,
    MODIFY `target` VARCHAR(100) NOT NULL;
