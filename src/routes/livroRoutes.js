import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();
routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/busca-filtro", LivroController.listarLivrosPorFiltro);
routes.get("/livros/busca-qtd-pgs", LivroController.listarLivrosPorQtdPaginas);
routes.get("/livros/:id", LivroController.buscarLivro);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);
export default routes;