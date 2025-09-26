import { Sequelize } from "sequelize";

const sequelize = new Sequelize("dbDenuncia", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com banco estabelecida!");
  } catch (error) {
    console.error("❌ Erro ao conectar no banco:", error);
  }
}

export { sequelize };
