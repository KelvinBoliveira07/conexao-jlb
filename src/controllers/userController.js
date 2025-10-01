import usuarioModel from "../models/usuarioModel.js";

// Função para criar um novo usuário
export const createUser = async (req, res) => {
  try {
    const emailMinusculo = req.body.emailUsuario.toLowerCase();
    const usuario = await usuarioModel.create({ ...req.body, emailUsuario: emailMinusculo });
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Função para obter perfil por ID
export const getPerfil = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const usuario = await usuarioModel.findByPk(idUsuario);
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

// Função para atualizar perfil por ID
export const atualizarPerfil = async (req, res) => {
  const { idUsuario } = req.params;
  const { nomeUsuario, fotoUsuario } = req.body;

  try {
    const usuario = await usuarioModel.findByPk(idUsuario);
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    usuario.nomeUsuario = nomeUsuario || usuario.nomeUsuario;
    usuario.fotoUsuario = fotoUsuario || usuario.fotoUsuario;

    await usuario.save();
    res.json({ message: "Perfil atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
