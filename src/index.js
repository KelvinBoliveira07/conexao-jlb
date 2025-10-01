import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"; 
import { Op, Sequelize } from 'sequelize';

// DB
import { connectDB, sequelize } from "./config/configDb.js";

// Models
import usuarioModel from "./models/usuarioModel.js";
import administradorModel from "./models/administradorModel.js";
import denunciaModel from "./models/denunciaModel.js";
import categoriaModel from "./models/categoriaModel.js";
import gerenciamentoUsuarioModel from "./models/gerenciamentoUsuarioModel.js";
import gerenciamentoDenunciaModel from "./models/gerenciamentoDenunciaModel.js";

// Rotas
import authRoutes from "./routes/authRoutes.js";
import userProfileRoutes from "./routes/userProfileRoutes.js";
import denunciaRoutes from "./routes/denunciaRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js"; 

const app = express();
const PORT = 3000;

// Middleware JSON
app.use(express.json({ limit: '15mb' }));

// Resolver __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para permitir CORS
app.use(cors());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public2')));

// Configurar associações entre os modelos
usuarioModel.hasMany(denunciaModel, { foreignKey: "idUsuario" });
denunciaModel.belongsTo(usuarioModel, { foreignKey: "idUsuario" });
categoriaModel.hasMany(denunciaModel, { foreignKey: "idCategoria" });
denunciaModel.belongsTo(categoriaModel, { foreignKey: "idCategoria" });
administradorModel.hasMany(gerenciamentoUsuarioModel, { foreignKey: "idAdm" });
gerenciamentoUsuarioModel.belongsTo(administradorModel, { foreignKey: "idAdm" });
usuarioModel.hasMany(gerenciamentoUsuarioModel, { foreignKey: "idUsuario" });
gerenciamentoUsuarioModel.belongsTo(usuarioModel, { foreignKey: "idUsuario" });
administradorModel.hasMany(gerenciamentoDenunciaModel, { foreignKey: "idAdm" });
gerenciamentoDenunciaModel.belongsTo(administradorModel, { foreignKey: "idAdm" });
denunciaModel.hasMany(gerenciamentoDenunciaModel, { foreignKey: "idDenuncia" });
gerenciamentoDenunciaModel.belongsTo(denunciaModel, { foreignKey: "idDenuncia" });

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/userprofile", userProfileRoutes);
app.use("/api/denuncias", denunciaRoutes);
app.use("/api/dashboard", dashboardRoutes);

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