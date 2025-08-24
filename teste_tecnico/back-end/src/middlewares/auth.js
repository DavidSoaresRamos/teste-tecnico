import jwt from 'jsonwebtoken';

// Middleware de autenticação.
// Verifica se o token JWT enviado no header é válido.
// Caso contrário, retorna erro 401 (não autorizado).

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Pega o token do header
    jwt.verify(token, process.env.JWT_SECRET); // Valida o token com a chave secreta
    next(); // Se for válido, continua a requisição
  } catch (error) {
    res.status(401).json({ message: 'Autenticação falhou.' });
  }
};

export default auth;
