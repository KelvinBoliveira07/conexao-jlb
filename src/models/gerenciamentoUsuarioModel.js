import { DataTypes } from "sequelize";
import { sequelize } from "../config/configDb.js";
import administradorModel from "./administradorModel.js";
import usuarioModel from "./usuarioModel.js";

const gerenciamentoUsuarioModel = sequelize.define("GerenciamentoUsuario", {
  idGerenciamentoUsuario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  acaoGerenciamento: { type: DataTypes.STRING(50), allowNull: false },
  dataCriacao: { type: DataTypes.DATE, allowNull: false },
  comentarioUsuario: { type: DataTypes.TEXT }
}, {
  tableName: "tbGerenciamentoUsuario",
  timestamps: false
});

// Relacionamentos
administradorModel.hasMany(gerenciamentoUsuarioModel, { foreignKey: "idAdm" });
gerenciamentoUsuarioModel.belongsTo(administradorModel, { foreignKey: "idAdm" });

usuarioModel.hasMany(gerenciamentoUsuarioModel, { foreignKey: "idUsuario" });
gerenciamentoUsuarioModel.belongsTo(usuarioModel, { foreignKey: "idUsuario" });

export default gerenciamentoUsuarioModel;
