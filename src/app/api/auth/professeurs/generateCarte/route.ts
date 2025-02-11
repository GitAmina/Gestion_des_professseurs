
import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument, rgb } from 'pdf-lib';
import QRCode from 'qrcode';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Méthode non autorisée' });
    }

    const { id } = req.query; // ID du professeur
    if (!id) {
      return res.status(400).json({ message: 'ID du professeur requis' });
    }

    // Récupérer les infos du professeur
    const professeur = await prisma.professeur.findUnique({
      where: { id: Number(id) },
      include: { matieres: { include: { matiere: true } } },
    });

    if (!professeur) {
      return res.status(404).json({ message: 'Professeur non trouvé' });
    }

    // Générer le QR Code contenant les infos du professeur
    const qrData = `Nom: ${professeur.nom}\nPrénom: ${professeur.prenom}\nEmail: ${professeur.email}\nTéléphone: ${professeur.telephone}`;
    const qrCodeDataURL = await QRCode.toDataURL(qrData);

    // Créer un document PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([300, 200]); // Taille de la carte

    // Ajouter le texte (Nom, Prénom, Matière enseignée)
    const { width, height } = page.getSize();
    page.drawText(`Nom: ${professeur.nom}`, { x: 20, y: height - 40, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`Prénom: ${professeur.prenom}`, { x: 20, y: height - 60, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`Matière: ${professeur.matieres.map(m => m.matiere.nom).join(', ')}`, { x: 20, y: height - 80, size: 12, color: rgb(0, 0, 0) });

    // Ajouter l'image de profil si disponible
    if (professeur.photo) {
      const photoUrl = professeur.photo; // URL de la photo
      const photoArrayBuffer = await fetch(photoUrl).then(res => res.arrayBuffer());
      const photoImage = await pdfDoc.embedJpg(photoArrayBuffer);
      page.drawImage(photoImage, { x: width - 80, y: height - 80, width: 60, height: 60 });
    }

    // Ajouter le QR Code
    const qrImageArrayBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageArrayBuffer);
    page.drawImage(qrImage, { x: 20, y: 20, width: 50, height: 50 });

    // Générer le PDF final
    const pdfBytes = await pdfDoc.save();

    // Envoyer le PDF en réponse
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="carte_professeur_${professeur.nom}.pdf"`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}
