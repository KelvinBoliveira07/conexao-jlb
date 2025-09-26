import { DataTypes } from "sequelize";
import { sequelize } from "../config/configDb.js";

const usuarioModel = sequelize.define("Usuario", {
  idUsuario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nomeUsuario: { type: DataTypes.STRING(100), allowNull: false },
  emailUsuario: { 
    type: DataTypes.STRING(100), 
    allowNull: false, 
    unique: true, // Garante que não haverá e-mails duplicados
    validate: {
      isEmail: { // Validação de formato de e-mail
        msg: "Por favor, insira um endereço de e-mail válido."
      }
    }
  },
  senhaUsuario: { type: DataTypes.STRING(40), allowNull: false },
  statusUsuario: { type: DataTypes.STRING(10), allowNull: false, defaultValue: 'ativo' }, // Removido o status "pendente"
  dataCriacaoUsuario: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  tipoUsuario: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'comum' },
  fotoUsuario: { type: DataTypes.TEXT('medium'), allowNull: true },
}, {
  tableName: "tbUsuario",
  timestamps: false
});

export default usuarioModel;