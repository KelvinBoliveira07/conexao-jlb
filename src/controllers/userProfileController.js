import Usuario from '../models/usuarioModel.js';

// GET perfil por email
export const getPerfil = async (req, res) => {
  const { emailUsuario } = req.params;

  try {
    const usuario = await Usuario.findOne({ where: { emailUsuario } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json({
      nomeUsuario: usuario.nomeUsuario,
      emailUsuario: usuario.emailUsuario,
      tipoUsuario: usuario.tipoUsuario,
      fotoUsuario: usuario.fotoUsuario // envia base64
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT atualizar perfil (nome e foto)
export const atualizarPerfil = async (req, res) => {
  const { emailUsuario } = req.params;
  const { nomeUsuario, fotoUsuario } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { emailUsuario } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    usuario.nomeUsuario = nomeUsuario || usuario.nomeUsuario;
    usuario.fotoUsuario = fotoUsuario || usuario.fotoUsuario;

    await usuario.save();
    res.json({ message: "Perfil atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
