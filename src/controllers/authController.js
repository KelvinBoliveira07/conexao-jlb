import usuarioModel from "../models/usuarioModel.js";

export const loginUser = async (req, res) => {
  const { emailUsuario, senhaUsuario } = req.body;
  let emailMinusculo;

  try {
    emailMinusculo = emailUsuario.toLowerCase();
    const usuario = await usuarioModel.findOne({ where: { emailUsuario: emailMinusculo } });
    
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (usuario.senhaUsuario !== senhaUsuario) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    res.json({
      message: "Login bem-sucedido",
      usuario: {
        idUsuario: usuario.idUsuario,
        nome: usuario.nomeUsuario,
        email: usuario.emailUsuario,
        tipo: usuario.tipoUsuario
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { emailUsuario, senhaUsuario } = req.body;
  let emailMinusculo;

  try {
    emailMinusculo = emailUsuario.toLowerCase();
    const usuario = await usuarioModel.findOne({ where: { emailUsuario: emailMinusculo } });

    if (!usuario) {
      return res.status(404).json({ error: "Administrador não encontrado" });
    }

    if (usuario.senhaUsuario !== senhaUsuario) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    if (usuario.tipoUsuario !== "admin") {
      return res.status(403).json({ error: "Acesso negado. Não é administrador." });
    }

    res.json({
      message: "Login de administrador bem-sucedido",
      usuario: {
        idUsuario: usuario.idUsuario,
        nome: usuario.nomeUsuario,
        email: usuario.emailUsuario,
        tipo: usuario.tipoUsuario
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

