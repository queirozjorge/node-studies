import mongoose from "mongoose";
import { autor } from "../models/Autor.js"
import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros (req, res, next) {

        try {
            const listaLivros = await livro.find();
            res.status(200).json(listaLivros);
        } catch (error) {
            next(error);
        }
    }

    static async buscarLivro (req, res, next) {
        
        try {
            const id = req.params.id
            const livroEncontrado = await livro.findById(id);
            if(livroEncontrado !== null) {
                return res.status(200).json(livroEncontrado);
            } else {
                return res.status(404).json({message: 'Livro nao encontrado'});
            }
        } catch (error) {
            next(error);
        }
    }

    static async cadastrarLivro(req, res, next) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado }}
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Livro criado com sucesso", livro: livroCriado });
        } catch (error) {
            next(error);
        }
    }

    static async atualizarLivro (req, res, next) {
        
        try {
            const id = req.params.id
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

    static async deletarLivro (req, res, next) {
        
        try {
            const id = req.params.id
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro deletado com sucesso" });
        } catch (error) {
            next(error);
        }
    }

    static async listarLivrosPorEditor (req, res, next) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (error) {
            next(error);
        }
    }

};

export default LivroController;