import express from 'express';
import { getPerfil, atualizarPerfil } from '../controllers/userProfileController.js';

const router = express.Router();

// GET perfil por email
router.get('/:emailUsuario', getPerfil);

// PUT atualizar perfil (nome e foto)
router.put('/:emailUsuario', atualizarPerfil);

export default router;
