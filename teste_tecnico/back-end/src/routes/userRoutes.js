import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Rota de login
// Verifica email/senha, gera e retorna um token JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  const user = users[0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Rota de cadastro de usuário
// Cria um novo usuário com senha criptografada
router.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  );

  res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});

// Rota protegida - lista de usuários
// Só acessível com token válido (middleware auth)
router.get('/users', auth, async (req, res) => {
  const [users] = await db.execute(
    'SELECT id, name, email, created_at FROM users'
  );
  res.json(users);
});

export default router;
