import usuarioModel from "../models/usuarioModel.js";
import denunciaModel from "../models/denunciaModel.js";
import { sequelize } from "../config/configDb.js";
import { Op } from "sequelize";

// Controlador para dados de denúncias
export const getDenunciasDashboard = async (req, res) => {
  try {
    // Agrupa as denúncias pelo status e conta o total de cada grupo
    const denuncias = await denunciaModel.findAll({
      attributes: [
        'statusDenuncia',
        [sequelize.fn('COUNT', sequelize.col('idDenuncia')), 'total']
      ],
      group: ['statusDenuncia']
    });

    res.json(denuncias);
  } catch (error) {
    console.error("Erro ao buscar dados de denúncias:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Controlador para dados de usuários
export const getUsuariosDashboard = async (req, res) => {
  try {
    // Agrupa os usuários pelo status e conta o total de cada grupo
    const usuarios = await usuarioModel.findAll({
      attributes: [
        'statusUsuario',
        [sequelize.fn('COUNT', sequelize.col('idUsuario')), 'total']
      ],
      group: ['statusUsuario']
    });

    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar dados de usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}