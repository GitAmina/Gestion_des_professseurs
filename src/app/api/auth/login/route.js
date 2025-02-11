import db from '../../../lib/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../lib/auth';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email et mot de passe sont requis' }), { status: 400 });
  }

<<<<<<< HEAD
  const [rows] = await db.execute('SELECT * FROM professeurs WHERE email = ?', [email]);
=======
  const [rows] = await db.execute('SELECT * FROM professeur WHERE email = ?', [email]);
>>>>>>> cd963f70812bcdb76c8f2010a7dace64c2e87fa6
  const user = rows[0];

  if (!user) {
    return new Response(JSON.stringify({ message: 'Utilisateur non trouvé' }), { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ message: 'Mot de passe incorrect' }), { status: 400 });
  }

  const token = generateToken(user);
  return new Response(JSON.stringify({ token }), { status: 200 });
}
