-- SQL migration for Wish List Portal tables

-- User table
CREATE TABLE IF NOT EXISTS `User` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `fullName` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(191) NOT NULL,
  `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
);

-- Wish table
CREATE TABLE IF NOT EXISTS `Wish` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `productName` VARCHAR(191) NOT NULL,
  `productLink` VARCHAR(191) NOT NULL,
  `description` TEXT,
  `purchased` BOOLEAN NOT NULL DEFAULT FALSE,
  `purchasedBy` INT,
  `userId` INT NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  FOREIGN KEY (`userId`) REFERENCES `User`(`id`)
);
