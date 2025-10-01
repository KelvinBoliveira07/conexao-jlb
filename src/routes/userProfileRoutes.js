import express from 'express';
import { getPerfil, atualizarPerfil } from '../controllers/userController.js';

const router = express.Router();

router.get('/:idUsuario', getPerfil);
router.put('/:idUsuario', atualizarPerfil);

export default router;
