
import jwt from 'jsonwebtoken';

// Définir la clé secrète directement dans le code (pas recommandé en production)
const JWT_SECRET_KEY = 'maCleSuperSecrete123!'; // Remplace par ta clé secrète

// Générer un token JWT
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email, photo: user.photo , statut: user.statut, telephone: user.telephone },
    JWT_SECRET_KEY,  // Utilisation de la clé secrète définie directement
    { expiresIn: '1h' }
  );
};

// Vérifier un token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET_KEY);  // Vérification avec la même clé secrète
  } catch (err) {
    return null;
  }
};
