import { DataTypes } from "sequelize";
import { sequelize } from "../config/configDb.js";
import usuarioModel from "./usuarioModel.js";
import categoriaModel from "./categoriaModel.js";

const denunciaModel = sequelize.define("Denuncia", {
  idDenuncia: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tituloDenuncia: { type: DataTypes.STRING(255), allowNull: false },
  descricaoUsuario: { type: DataTypes.TEXT, allowNull: false },
  statusDenuncia: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "Em andamento" },
  anexos: { type: DataTypes.JSON, allowNull: true }
}, {
  tableName: "tbDenuncia",
  timestamps: true
});

usuarioModel.hasMany(denunciaModel, { foreignKey: "idUsuario" });
denunciaModel.belongsTo(usuarioModel, { foreignKey: "idUsuario" });

categoriaModel.hasMany(denunciaModel, { foreignKey: "idCategoria" });
denunciaModel.belongsTo(categoriaModel, { foreignKey: "idCategoria" });

export default denunciaModel;
