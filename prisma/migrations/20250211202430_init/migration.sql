/*
  Warnings:

  - You are about to drop the `professeur` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `EtudiantModule_id_module_fkey` ON `etudiantmodule`;

-- DropIndex
DROP INDEX `Log_utilisateur_id_fkey` ON `log`;

-- DropIndex
DROP INDEX `ModuleMatiere_id_matiere_fkey` ON `modulematiere`;

-- DropIndex
DROP INDEX `ProfesseurMatiere_id_matiere_fkey` ON `professeurmatiere`;

-- DropTable
DROP TABLE `professeur`;

-- CreateTable
CREATE TABLE `Professeurs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statut` ENUM('Permanent', 'Vacataire') NOT NULL,
    `photo` VARCHAR(191) NULL,

    UNIQUE INDEX `Professeurs_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Professeurs` ADD CONSTRAINT `Professeurs_id_fkey` FOREIGN KEY (`id`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Etudiant` ADD CONSTRAINT `Etudiant_id_fkey` FOREIGN KEY (`id`) REFERENCES `Utilisateur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModuleMatiere` ADD CONSTRAINT `ModuleMatiere_id_module_fkey` FOREIGN KEY (`id_module`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModuleMatiere` ADD CONSTRAINT `ModuleMatiere_id_matiere_fkey` FOREIGN KEY (`id_matiere`) REFERENCES `Matiere`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfesseurMatiere` ADD CONSTRAINT `ProfesseurMatiere_id_professeur_fkey` FOREIGN KEY (`id_professeur`) REFERENCES `Professeurs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfesseurMatiere` ADD CONSTRAINT `ProfesseurMatiere_id_matiere_fkey` FOREIGN KEY (`id_matiere`) REFERENCES `Matiere`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EtudiantModule` ADD CONSTRAINT `EtudiantModule_id_etudiant_fkey` FOREIGN KEY (`id_etudiant`) REFERENCES `Etudiant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EtudiantModule` ADD CONSTRAINT `EtudiantModule_id_module_fkey` FOREIGN KEY (`id_module`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_utilisateur_id_fkey` FOREIGN KEY (`utilisateur_id`) REFERENCES `Utilisateur`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
