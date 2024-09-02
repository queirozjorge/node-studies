import express from "express";
import AutorController from "../controllers/autorController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/autor", AutorController.listarAutores, paginar);
routes.get("/autor/:id", AutorController.buscarAutor);
routes.post("/autor", AutorController.cadastrarAutor);
routes.put("/autor/:id", AutorController.atualizarAutor);
routes.delete("/autor/:id", AutorController.deletarAutor);

export default routes;