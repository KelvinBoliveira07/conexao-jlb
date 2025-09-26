import { DataTypes } from "sequelize";
import { sequelize } from "../config/configDb.js";

const categoriaModel = sequelize.define("Categoria", {
  idCategoria: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nomeCategoria: { type: DataTypes.STRING(50), allowNull: false },
  descricaoCategoria: { type: DataTypes.TEXT }
}, {
  tableName: "tbCategoria",
  timestamps: false
});

export default categoriaModel;
