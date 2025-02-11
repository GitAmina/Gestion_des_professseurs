import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const professeurs = await prisma.professeurs.findMany({
        include: {
          utilisateur: true, // Inclure les informations de l'utilisateur associé
          matieres: {
            include: {
              matiere: true, // Récupérer les matières enseignées
            },
          },
        },
      });

      // Assurez-vous de ne pas retourner une valeur void.
      await res.status(200).json(professeurs);
      return;
    }

    // Retourner une réponse explicite pour les méthodes non autorisées
    return res.status(405).json({ message: 'Méthode non autorisée' });
  } catch (error) {
    console.error('Erreur lors de la récupération des professeurs:', error);

    // Assurez-vous d'envoyer la réponse avant de retourner
    await res.status(500).json({ message: 'Erreur serveur' });
    return;
  }
}
