import denunciaModel from "../models/denunciaModel.js";
import usuarioModel from "../models/usuarioModel.js";
import categoriaModel from "../models/categoriaModel.js";

// Função para criar uma nova denúncia
export const criarDenuncia = async (req, res) => {
  try {
    const { tituloDenuncia, descricaoDenuncia, idUsuario, idCategoria, anexos } = req.body;
    
    if (!tituloDenuncia || !descricaoDenuncia || !idUsuario || !idCategoria) {
      return res.status(400).json({ error: "Título, descrição, usuário e categoria são obrigatórios." });
    }

    const novaDenuncia = await denunciaModel.create({
      tituloDenuncia,
      descricaoUsuario: descricaoDenuncia,
      idUsuario,
      idCategoria,
      anexos: anexos || [], 
      statusDenuncia: 'Em andamento',
    });

    res.status(201).json(novaDenuncia);
  } catch (error) {
    console.error("Erro ao criar denúncia:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para listar as denúncias de um usuário específico
export const listarMinhasDenuncias = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const minhasDenuncias = await denunciaModel.findAll({
      where: { idUsuario },
      include: [{ model: categoriaModel, attributes: ['nomeCategoria'] }]
    });
    res.status(200).json(minhasDenuncias);
  } catch (error) {
    console.error("Erro ao buscar minhas denúncias:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função para listar todas as denúncias (tela de administrador)
export const listarTodasDenuncias = async (req, res) => {
  try {
    const todasDenuncias = await denunciaModel.findAll({
      include: [
        { model: usuarioModel, attributes: ['nomeUsuario', 'emailUsuario'] },
        { model: categoriaModel, attributes: ['nomeCategoria'] }
      ]
    });
    res.status(200).json(todasDenuncias);
  } catch (error) {
    console.error("Erro ao listar todas as denúncias:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
