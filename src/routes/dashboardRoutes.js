import express from "express";
import { getDenunciasDashboard, getUsuariosDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/denuncias/:idUsuario", getDenunciasDashboard);
router.get("/usuarios/:idUsuario", getUsuariosDashboard);

export default router;