# 📝 Teste Técnico – Desenvolvedor Full Stack

Este projeto foi desenvolvido como parte de um **teste técnico** para demonstrar conhecimentos em **Node.js (Back-end)**, **React (Front-end)** e **MySQL (Banco de Dados)**.  

---

##  Tecnologias Utilizadas
- **Back-end**: Node.js, Express, JWT, Bcrypt, MySQL2  
- **Front-end**: React (Vite), Axios, React Router  
- **Banco de Dados**: MySQL  
- **Outros**: dotenv, cors  

---

##  Estrutura do Projeto

```
teste_tecnico/
│── back-end/
│   ├── src/
│   │   ├── middlewares/     # Middlewares (ex: autenticação JWT)
│   │   ├── routes/          # Rotas da aplicação
│   │   ├── db.js            # Conexão com banco
│   │   └── server.js        # Servidor Express
│   ├── .env.example         # Exemplo de variáveis de ambiente
│   ├── package.json
│
│── front-end/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis (Modal, etc.)
│   │   ├── pages/           # Páginas (Login, Listagem de Usuários)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│
│── db/
│   └── schema.sql           # Script para criação da tabela `users`
│
│── README.md                # Documentação do projeto
│── .gitignore
```

---

##  Configuração do Projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/DavidSoaresRamos/teste-tecnico.git
cd teste_tecnico
```

### 2. Configurar o banco de dados MySQL
No MySQL Workbench ou terminal, execute o script em `db/schema.sql` para criar a tabela necessária.

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` dentro da pasta `back-end/` com os dados do seu banco:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=mydb
JWT_SECRET=sua_chave_secreta
```

> O arquivo `.env.example` já está disponível como modelo.

### 4. Rodar o Back-end
```bash
cd back-end
npm install
npm run start
```

O servidor estará rodando em:  
 `http://localhost:5000`

### 5. Rodar o Front-end
```bash
cd front-end
npm install
npm run dev
```

O front estará disponível em:  
 `http://localhost:5173`

---

##  Rotas da API

- **POST /api/users** → Cria novo usuário  
- **POST /api/login** → Login de usuário (retorna JWT)  
- **GET /api/users** → Lista usuários (rota protegida, exige JWT no header Authorization)  

---

##  Banco de Dados (MySQL)

### 1. Script para criar tabela de usuários
Arquivo: `db/schema.sql`
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Query para listar os 5 usuários mais recentes
```sql
SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC
LIMIT 5;
```

### 3. Normalização para papéis de usuário
Caso seja necessário adicionar papéis (ex: **admin**, **cliente**), a forma correta seria:  
- Criar uma tabela `roles` para armazenar os papéis.  
- Adicionar um campo `role_id` em `users` como chave estrangeira.  

Exemplo:
```sql
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

ALTER TABLE users ADD COLUMN role_id INT,
ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id);
```

---

##  Explicações Teóricas

### 1. Back-end (Node.js)
**Q3. Estrutura de pastas escalável**  
A estrutura foi separada em:  
- `routes/` → define endpoints da API  
- `middlewares/` → autenticação e lógica reutilizável  
- `db.js` → conexão central com MySQL  
- `server.js` → inicializa o servidor Express  

Isso permite fácil manutenção e escalabilidade caso o projeto cresça.

---

### 2. Front-end (React)
**Q4. Organização de componentes e estados**  
- `pages/` → páginas principais (Login, Listagem de Usuários)  
- `components/` → componentes reutilizáveis (Modal, Formulários)  
- Estados controlados com `useState` para inputs  
- `useEffect` para buscar usuários da API  
- Organização permite reaproveitamento de código e separação de responsabilidades.  

---
  
