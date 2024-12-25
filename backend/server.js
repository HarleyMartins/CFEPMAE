/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const pg = require("pg");
require("dotenv").config(); // Carrega as variáveis do .env

const app = express();
const PORT = 5000;

// Configuração do banco de dados com as variáveis do .env
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL, // Variável do .env
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões SSL em serviços como NeonDB
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Chave secreta para o token JWT (definida no .env)
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_super_segura"; // Use uma chave mais segura no .env

// Rota de login
app.post("/login", async (req, res) => {
  const { matricula, senha } = req.body;

  try {
    const query = "SELECT * FROM alunos WHERE matricula = $1 AND senha = $2";
    const result = await pool.query(query, [matricula, senha]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Matrícula ou senha incorretas." });
    }

    const user = result.rows[0];

    // Gera o token JWT com o nomeCompleto
    const token = jwt.sign(
      {
        id: user.id,
        matricula: user.matricula,
        primeironome: user.primeironome, // Adiciona o nomeCompleto ao token
      },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token expira em 1 hora
      }
    );

    res.status(200).json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

// Middleware de autenticação
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // O token vem no formato: "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso negado. Token não fornecido." });
  }

  console.log("Token recebido no backend: ", token); // Log do token

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token inválido ou expirado." });
    }

    req.user = user; // Adiciona os dados do usuário à requisição
    next();
  });
}

// Rota protegida: /cards
app.get("/cards", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "Bem-vindo à área de cards!", user: req.user });
});

// Rota protegida: /turma
app.get("/turma", authenticateToken, async (req, res) => {
  try {
    // Consultando os alunos no banco de dados
    const query =
      "SELECT primeironome, imagem, cargo, serie_e_curso FROM alunos ORDER BY id ASC";
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Nenhum aluno encontrado." });
    }

    // Retorna os dados dos alunos (primeironome e imagem)
    res.status(200).json({ alunos: result.rows });
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: "Erro ao buscar os alunos." });
  }
});

// Testando a rota inicial
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta  ${PORT}`);
});
