import { autor } from "../models/Autor.js";

class AutorController {

    static async listarAutores (req, res, next) {

        try {
            const listaAutores = await autor.find();
            res.status(200).json(listaAutores);
        } catch (error) {
            next(error);
        }
    }

    static async buscarAutor (req, res, next) {
        
        try {
            const id = req.params.id
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (error) {
            next(error);
        }
    }

    static async cadastrarAutor(req, res, next) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Autor criado com sucesso", autor: novoAutor });
        } catch (error) {
            next(error);
        }
    }

    static async atualizarAutor (req, res, next) {
        
        try {
            const id = req.params.id
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Autor atualizado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

    static async deletarAutor (req, res, next) {
        
        try {
            const id = req.params.id
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: "Autor deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

};

export default AutorController;