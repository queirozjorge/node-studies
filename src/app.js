import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorErros.js";

const conexao = await connectDatabase();

conexao.on("error", (erro) => {
    console.error("Erro de conexão", erro);
})

conexao.once("open", () => {
    console.log("Conexão ao banco dados NoSql(MongoDB) estabelecida com sucesso");
})

const app = express();
routes(app);

app.use(manipuladorDeErros);

export default app;