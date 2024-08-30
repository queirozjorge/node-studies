import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await connectDatabase();

conexao.on("error", (erro) => {
    console.error(`${new Date().toISOString()} [ERROR]: Problema de conexão`, erro);
})

conexao.once("open", () => {
    console.log(`${new Date().toISOString()} [LOG]: Conexão ao banco dados NoSql(MongoDB) estabelecida com sucesso`);
})

const app = express();
routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;