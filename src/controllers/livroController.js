import mongoose from "mongoose";
import { autor } from "../models/Autor.js"
import livro from "../models/Livro.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

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
                next(new NaoEncontrado('Livro não encontrado'));
            }
        } catch (error) {
            next(error);
        }
    }

    static async cadastrarLivro(req, res, next) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            if(autorEncontrado !== null) {
                const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado }}
                const livroCriado = await livro.create(livroCompleto);
                res.status(201).json({ message: "Livro criado com sucesso", livro: livroCriado });
            } else {
                next(new NaoEncontrado('Autor não encontrado'));
            }
        } catch (error) {
            next(error);
        }
    }

    static async atualizarLivro (req, res, next) {
        
        try {
            const id = req.params.id
            const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);
            if(livroEncontrado !== null) {
                res.status(200).json({ message: "Livro atualizado com sucesso" });
            } else {
                next(new NaoEncontrado('Livro não encontrado'));
            }
        } catch (error) {
            next(error);
        }
    }

    static async deletarLivro (req, res, next) {
        
        try {
            const id = req.params.id
            const livroDeletado = await livro.findByIdAndDelete(id);
            if(livroDeletado !== null) {
                return res.status(200).json({ message: "Livro deletado com sucesso" });
            } else {
                next(new NaoEncontrado('Livro não encontrado'));
            }
        } catch (error) {
            next(error);
        }
    }

    static async listarLivrosPorEditor (req, res, next) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            if(livrosPorEditora !== null) {
                return res.status(200).json(livrosPorEditora);
            } else {
                next(new NaoEncontrado('Livros não encontrados'));
            }
        } catch (error) {
            next(error);
        }
    }

};

export default LivroController;