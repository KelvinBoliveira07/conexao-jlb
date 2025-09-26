// src/controllers/adminController.js
import Usuario from "../models/usuarioModel.js";

// Login administrador
export const loginAdmin = async (req, res) => {
    const { emailUsuario, senhaUsuario } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { emailUsuario } });

        if (!usuario) {
            return res.status(404).json({ error: "Administrador não encontrado" });
        }

        if (usuario.senhaUsuario !== senhaUsuario) {
            return res.status(401).json({ error: "Senha incorreta" });
        }

        if (usuario.tipoUsuario !== "admin") {
            return res.status(403).json({ error: "Acesso negado. Não é administrador." });
        }

        return res.json({
            message: "Login realizado com sucesso!",
            usuario: {
                id: usuario.id,
                nome: usuario.nomeUsuario,
                email: usuario.emailUsuario,
                tipo: usuario.tipoUsuario
            }
        });
    } catch (error) {
        console.error("Erro no login ADM:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};
