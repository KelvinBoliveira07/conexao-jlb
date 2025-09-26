// routes/userRoutes.js
import express from "express";
import { createUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser); // Rota para cadastro de usuário
router.get("/", getAllUsers); // Rota para listar todos os usuários (para teste, se necessário)

export default router;
