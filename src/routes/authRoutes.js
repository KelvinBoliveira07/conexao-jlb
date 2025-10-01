import express from "express";
import { loginUser, loginAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/loginadm", loginAdmin);

export default router;
