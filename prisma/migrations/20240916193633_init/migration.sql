-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `customer_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `measure` (
    `uuid` VARCHAR(191) NOT NULL,
    `datetime` DATETIME(3) NOT NULL,
    `type` ENUM('WATER', 'GAS') NOT NULL,
    `has_confirmed` BOOLEAN NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `value` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `measure` ADD CONSTRAINT `measure_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
