import usuarioModel from "../models/usuarioModel.js";

// Função para criar um novo usuário
export const createUser = async (req, res) => {
  try {
    // Garante que o email seja salvo em minúsculas
    const emailMinusculo = req.body.emailUsuario.toLowerCase();
    const usuario = await usuarioModel.create({ ...req.body, emailUsuario: emailMinusculo });
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Função para listar todos os usuários
export const getAllUsers = async (req, res) => {
  try {
    const usuarios = await usuarioModel.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para obter perfil por e-mail
export const getPerfil = async (req, res) => {
  const { emailUsuario } = req.params;

  try {
    const usuario = await usuarioModel.findOne({ where: { emailUsuario: emailUsuario.toLowerCase() } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json({
      nomeUsuario: usuario.nomeUsuario,
      emailUsuario: usuario.emailUsuario,
      tipoUsuario: usuario.tipoUsuario,
      fotoUsuario: usuario.fotoUsuario
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Função para atualizar perfil
export const atualizarPerfil = async (req, res) => {
  const { emailUsuario } = req.params;
  const { nomeUsuario, fotoUsuario } = req.body;

  try {
    const usuario = await usuarioModel.findOne({ where: { emailUsuario: emailUsuario.toLowerCase() } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    usuario.nomeUsuario = nomeUsuario || usuario.nomeUsuario;
    usuario.fotoUsuario = fotoUsuario || usuario.fotoUsuario;

    await usuario.save();
    res.json({ message: "Perfil atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NOVO: Função para verificar e-mail e nome (primeira etapa)
export const verificarUsuario = async (req, res) => {
  try {
    const { emailUsuario, nomeUsuario } = req.body;
    const emailMinusculo = emailUsuario.toLowerCase();

    const usuario = await usuarioModel.findOne({ 
      where: { 
        emailUsuario: emailMinusculo,
        nomeUsuario: nomeUsuario
      } 
    });

    if (!usuario) {
      return res.status(404).json({ error: "E-mail ou nome de usuário incorretos." });
    }

    res.status(200).json({ message: "Verificação bem-sucedida." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// NOVO: Função para redefinir a senha (segunda etapa)
export const redefinirSenha = async (req, res) => {
  try {
    const { emailUsuario, nomeUsuario, novaSenha } = req.body;

    const emailMinusculo = emailUsuario.toLowerCase();
    
    // Busca o usuário novamente para garantir que a combinação ainda é válida
    const usuario = await usuarioModel.findOne({ 
      where: { 
        emailUsuario: emailMinusculo,
        nomeUsuario: nomeUsuario
      } 
    });

    if (!usuario) {
      return res.status(404).json({ error: "E-mail ou nome de usuário incorretos." });
    }
    
    usuario.senhaUsuario = novaSenha;
    await usuario.save();

    res.status(200).json({ message: "Senha redefinida com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};