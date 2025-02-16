import db from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';
import bcrypt from 'bcrypt';

export async function PUT(req) {
  // Récupérer le token
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    console.error("Token manquant");
    return new Response(JSON.stringify({ message: "Accès refusé, token manquant" }), { status: 403 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    console.error("Token invalide");
    return new Response(JSON.stringify({ message: "Token invalide" }), { status: 403 });
  }

  const { ancienMotDePasse, nouveauMotDePasse } = await req.json();

  if (!ancienMotDePasse || !nouveauMotDePasse) {
    return new Response(JSON.stringify({ message: "Les deux mots de passe sont requis" }), { status: 400 });
  }

  try {
    // Récupérer l'ancien mot de passe en base
    const [user] = await db.query("SELECT password FROM professeur WHERE id = ?", [decoded.id]);

    if (!user || user.length === 0) {
      return new Response(JSON.stringify({ message: "Utilisateur introuvable" }), { status: 404 });
    }

    // Comparer l'ancien mot de passe
    const passwordMatch = await bcrypt.compare(ancienMotDePasse, user[0].password);

    if (!passwordMatch) {
      return new Response(JSON.stringify({ message: "Ancien mot de passe incorrect" }), { status: 403 });
    }

    // Hachage du nouveau mot de passe
    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);
    
    // Mise à jour du mot de passe en base
    await db.execute("UPDATE professeur SET password = ? WHERE id = ?", [hashedPassword, decoded.id]);

    return new Response(JSON.stringify({ message: "Mot de passe mis à jour avec succès" }), { status: 200 });

  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    return new Response(JSON.stringify({ message: "Erreur serveur", error: error.message }), { status: 500 });
  }
}
