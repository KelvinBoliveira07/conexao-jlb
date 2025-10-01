import { DataTypes } from "sequelize";
import { sequelize } from "../config/configDb.js";
import administradorModel from "./administradorModel.js";
import denunciaModel from "./denunciaModel.js";

const gerenciamentoDenunciaModel = sequelize.define("GerenciamentoDenuncia", {
  idGerenciamentoDenuncia: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  acaoGerenciamentoDenuncia: { type: DataTypes.STRING(50), allowNull: false },
  dataCriacao: { type: DataTypes.DATE, allowNull: false },
  comentarioGerenciamentoDenuncia: { type: DataTypes.TEXT }
}, {
  tableName: "tbGerenciamentoDenuncia",
  timestamps: false
});

// Relacionamentos
administradorModel.hasMany(gerenciamentoDenunciaModel, { foreignKey: "idAdm" });
gerenciamentoDenunciaModel.belongsTo(administradorModel, { foreignKey: "idAdm" });

denunciaModel.hasMany(gerenciamentoDenunciaModel, { foreignKey: "idDenuncia" });
gerenciamentoDenunciaModel.belongsTo(denunciaModel, { foreignKey: "idDenuncia" });

export default gerenciamentoDenunciaModel;
