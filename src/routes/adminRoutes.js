import express from "express";
import { loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

// Rota de login do administrador
router.post("/login", loginAdmin);

export default router;
