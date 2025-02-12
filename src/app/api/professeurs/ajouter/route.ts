// src/app/api/professeurs/ajouter/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  database: 'gestion_professeurs',
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nom = formData.get('nom') as string;
    const prenom = formData.get('prenom') as string;
    const telephone = formData.get('telephone') as string;
    const email = formData.get('email') as string;
    const statut = formData.get('statut') as 'Permanent' | 'Vacataire';
    const photoFile = formData.get('photo') as File | null;
    const matieres = JSON.parse(formData.get('matieres') as string) as number[]; // Récupérer les matières sélectionnées

    let photoUrl: string | null = null;

    if (photoFile) {
      const buffer = Buffer.from(await photoFile.arrayBuffer());
      const fileName = `${Date.now().toString()}-${photoFile.name}`;
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      photoUrl = `/uploads/${fileName}`;
    }

    const connection = await mysql.createConnection(dbConfig);

    // Insérer le professeur
    const [result] = await connection.execute(
      'INSERT INTO Professeur (nom, prenom, telephone, email, statut, photo) VALUES (?, ?, ?, ?, ?, ?)',
      [nom, prenom, telephone, email, statut, photoUrl]
    );

    // Typage plus précis du résultat
    const professeurId = (result as mysql.OkPacket).insertId;


    // Insérer les matières sélectionnées dans Professeur_Matiere
    for (const matiereId of matieres) {
      await connection.execute(
        'INSERT INTO Professeur_Matiere (id_professeur, id_matiere) VALUES (?, ?)',
        [professeurId, matiereId]
      );
    }

    await connection.end();

    return NextResponse.json({ message: 'Professeur ajouté avec succès' }, { status: 201 });
  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
