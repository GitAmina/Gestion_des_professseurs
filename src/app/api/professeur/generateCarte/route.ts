import { NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import QRCode from 'qrcode';
import {$Enums, PrismaClient} from '@prisma/client';
import Statut = $Enums.Statut;

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    // eslint-disable-next-line no-console -- Temporairement désactivé pour le débogage
    console.log('Début de la génération du PDF');

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    // eslint-disable-next-line no-console -- Temporairement désactivé pour le débogage
    console.log('ID du professeur:', id);

    if (!id) {
      return new NextResponse(JSON.stringify({ message: 'ID du professeur requis' }))

    }

    // Récupérer les infos du professeur
    const professeur = await prisma.professeur.findUnique({
      where: { id: parseInt(id) },
      include: {
        Professeur_Matiere: {
          include: {
            matiere: { select: { nom: true } }, // Sélectionner uniquement le nom des matières
          },
        },
      },
    }) as {
      nom: string;
      prenom: string;
      email: string;
      statut : Statut;
      telephone?: string;
      photo?: string;
      matiere?: string;
      Professeur_Matiere: { matiere: { nom: string } }[];
    } | null;



    // eslint-disable-next-line no-console -- Temporairement désactivé pour le débogage
    console.log('Professeur récupéré:', professeur);

    if (!professeur) {
      return NextResponse.json({ message: 'Professeur non trouvé' });
    }

    // Générer le QR Code
    // eslint-disable-next-line no-console -- Temporairement désactivé pour le débogage
    console.log('Génération du QR Code...');
    const qrData = `Nom: ${professeur.nom}\nPrénom: ${professeur.prenom}\nEmail: ${professeur.email}\nTéléphone: ${professeur.telephone}`;
    const qrCodeDataURL = await QRCode.toDataURL(qrData);
    // eslint-disable-next-line no-console -- Temporairement désactivé pour le débogage
    console.log('QR Code généré:', qrCodeDataURL);

    // Créer un document PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([300, 200]);

    // Ajouter le texte
    const { width, height } = page.getSize();
    page.drawText(`Nom : ${professeur?.nom }`, { x: 20, y: height - 40, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`Prénom: ${professeur.prenom}`, { x: 20, y: height - 60, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`Statut: ${professeur.statut}`, { x: 20, y: height - 80, size: 12, color: rgb(0, 0, 0) });
    const matieres = professeur.Professeur_Matiere.map(m => m.matiere.nom).join(', ');
    page.drawText(`Matière:`, { x: 20, y: height - 100, size: 12, color: rgb(0, 0, 0) });
    page.drawText(matieres, { x: 20, y: height - 120, size: 10, color: rgb(0, 0, 0) });

    // Ajouter l'image de profil si disponible
    if (professeur.photo) {
      try {
        const baseUrl = "http://localhost:3000"; // Remplace par ton URL réelle
        const photoUrl = encodeURI(`${baseUrl}${professeur.photo}`);

        console.log("Chargement de l'image:", photoUrl);

        const response = await fetch(photoUrl);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const photoArrayBuffer = await response.arrayBuffer();

        let photoImage;
        if (photoUrl.endsWith('.jpg') || photoUrl.endsWith('.jpeg')) {
          photoImage = await pdfDoc.embedJpg(photoArrayBuffer);
        } else if (photoUrl.endsWith('.png')) {
          photoImage = await pdfDoc.embedPng(photoArrayBuffer);
        } else {
          throw new Error("Format d'image non supporté");
        }

        page.drawImage(photoImage, { x: width - 100, y: height - 100, width: 80, height: 80 });

      } catch (err) {
        console.error("Erreur lors du chargement de la photo:", err);
      }
    }

    // Ajouter le QR Code
    const qrImageBytes = Buffer.from(qrCodeDataURL.replace(/^data:image\/png;base64,/, ""), 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBytes);
    page.drawImage(qrImage, { x: 20, y: 20, width: 50, height: 50 });


    // Générer le PDF
    const pdfBytes = await pdfDoc.save();

    // Retourner le PDF sous forme de réponse NextResponse

    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="carte_professeur_${professeur.nom}.pdf"`,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- Temporairement désactivé pour le débogage
    console.error('Erreur lors de la génération du PDF:', error);
    return NextResponse.json({ message: 'Erreur serveur' });
  }
}
