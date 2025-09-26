import { DataTypes } from "sequelize";
import { sequelize } from "../config/configDb.js";
import usuarioModel from "./usuarioModel.js";

const administradorModel = sequelize.define("Administrador", {
  idAdm: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nomeAdm: { type: DataTypes.STRING(200), allowNull: false }
}, {
  tableName: "tbAdministrador",
  timestamps: false
});

usuarioModel.hasOne(administradorModel, { foreignKey: "idUsuario" });
administradorModel.belongsTo(usuarioModel, { foreignKey: "idUsuario" });

export default administradorModel;
