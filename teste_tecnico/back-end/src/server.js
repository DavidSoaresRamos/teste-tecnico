import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import db from './db.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // Permite trabalhar com JSON no corpo das requisições
app.use(cors());         // Libera acesso da API para outros domínios (frontend)

// Testa a conexão com o banco de dados
db.getConnection()
  .then(() => console.log('Conexão com o banco de dados MySQL bem-sucedida!'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Rotas principais da aplicação
app.use('/api', userRoutes);

// Inicializa o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
