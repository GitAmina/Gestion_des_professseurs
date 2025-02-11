-- DropIndex
DROP INDEX `Etudiant_Module_id_module_fkey` ON `etudiant_module`;

-- DropIndex
DROP INDEX `Log_utilisateur_id_fkey` ON `log`;

-- DropIndex
DROP INDEX `Module_Matiere_id_matiere_fkey` ON `module_matiere`;

-- DropIndex
DROP INDEX `Professeur_Matiere_id_matiere_fkey` ON `professeur_matiere`;

-- AlterTable
ALTER TABLE `professeur` MODIFY `photo` TEXT NULL;

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
