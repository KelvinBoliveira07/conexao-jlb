import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// DB
import { connectDB, sequelize } from "./config/configDb.js";

// Models
import usuarioModel from "./models/usuarioModel.js";
import administradorModel from "./models/administradorModel.js";
import denunciaModel from "./models/denunciaModel.js";

// Rotas
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userProfileRoutes from "./routes/userProfileRoutes.js";

// Controllers para redefinição de senha
import { verificarUsuario, redefinirSenha } from "./controllers/userController.js";

const app = express();
const PORT = 3000;

// Middleware JSON
app.use(express.json({ limit: '15mb' }));

// Resolver __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public2')));

// Rotas da API
app.use("/api/usuarios", userRoutes);
app.use("/api/administradores", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/userprofile", userProfileRoutes);

// ROTAS PARA O PROCESSO DE REDEFINIÇÃO DE SENHA EM DUAS ETAPAS
app.post("/api/verificar-usuario", verificarUsuario); // Rota para a primeira etapa
app.post("/api/redefinir-senha", redefinirSenha);     // Rota para a segunda etapa

// Rota raiz: redireciona para login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public2/login.html'));
});

// Fallback: qualquer arquivo HTML dentro de public2
app.get("/:file", (req, res) => {
  res.sendFile(path.join(__dirname, '../public2', req.params.file));
});

// Start servidor
app.listen(PORT, async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
  }
});