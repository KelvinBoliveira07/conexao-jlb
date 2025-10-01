import express from "express";
import { criarDenuncia, listarMinhasDenuncias, listarTodasDenuncias } from "../controllers/denunciaController.js";

const router = express.Router();

router.post("/", criarDenuncia);
router.get("/minhas/:idUsuario", listarMinhasDenuncias);
router.get("/admin", listarTodasDenuncias);

export default router;
