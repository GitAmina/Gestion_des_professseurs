/*
  Warnings:

  - You are about to drop the `etudiantmodule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `modulematiere` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professeurmatiere` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `professeurs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Log_utilisateur_id_fkey` ON `log`;

-- AlterTable
ALTER TABLE `etudiant` MODIFY `id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `etudiantmodule`;

-- DropTable
DROP TABLE `modulematiere`;

-- DropTable
DROP TABLE `professeurmatiere`;

-- DropTable
DROP TABLE `professeurs`;

-- CreateTable
CREATE TABLE `Professeur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statut` ENUM('permanent', 'vacataire') NOT NULL,
    `photo` VARCHAR(191) NULL,

    UNIQUE INDEX `Professeur_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module_Matiere` (
    `id_module` INTEGER NOT NULL,
    `id_matiere` INTEGER NOT NULL,

    PRIMARY KEY (`id_module`, `id_matiere`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professeur_Matiere` (
    `id_professeur` INTEGER NOT NULL,
    `id_matiere` INTEGER NOT NULL,

    PRIMARY KEY (`id_professeur`, `id_matiere`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Etudiant_Module` (
    `id_etudiant` INTEGER NOT NULL,
    `id_module` INTEGER NOT NULL,

    PRIMARY KEY (`id_etudiant`, `id_module`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Professeur` ADD CONSTRAINT `Professeur_id_fkey` FOREIGN KEY (`id`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etudiant` ADD CONSTRAINT `Etudiant_id_fkey` FOREIGN KEY (`id`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module_Matiere` ADD CONSTRAINT `Module_Matiere_id_module_fkey` FOREIGN KEY (`id_module`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module_Matiere` ADD CONSTRAINT `Module_Matiere_id_matiere_fkey` FOREIGN KEY (`id_matiere`) REFERENCES `Matiere`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professeur_Matiere` ADD CONSTRAINT `Professeur_Matiere_id_professeur_fkey` FOREIGN KEY (`id_professeur`) REFERENCES `Professeur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professeur_Matiere` ADD CONSTRAINT `Professeur_Matiere_id_matiere_fkey` FOREIGN KEY (`id_matiere`) REFERENCES `Matiere`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etudiant_Module` ADD CONSTRAINT `Etudiant_Module_id_etudiant_fkey` FOREIGN KEY (`id_etudiant`) REFERENCES `Etudiant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etudiant_Module` ADD CONSTRAINT `Etudiant_Module_id_module_fkey` FOREIGN KEY (`id_module`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `Utilisateur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
