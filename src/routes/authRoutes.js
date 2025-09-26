import express from "express";
import { loginUser, loginAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);       // login usuário comum
router.post("/loginadm", loginAdmin);   // login administrador

export default router;
