import { autor } from "../models/Autor.js"
import livro from "../models/Livro.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

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

    static async listarLivrosPorFiltro (req, res, next) {
        const busca = await processaBusca(req, res, next);
        try {
            if(Object.entries(busca).length !== 0) {
                const livrosPorFiltro = await livro.find(busca);
                if(livrosPorFiltro.length > 0) {
                    return res.status(200).json(livrosPorFiltro);
                } else {
                    next(new NaoEncontrado('Livros não encontrados'));
                }
            } else {
                next(new RequisicaoIncorreta('Deve ser enviado ao menos um parâmetro para filtrar busca'));
            }
        } catch (error) {
            next(error);
        }
    }

};

async function processaBusca(req, res, next) {
    /** Regex utilizando lib do javascript:
    const regexTitulo = new RegExp(titulo, 'i'); **/
    const busca = {};
    const { editora, titulo, nomeAutor, qtdPgsMenorQue, qtdPgsMaiorQue } = req.query;
    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = { $regex: titulo, $options: 'i' };
    if (qtdPgsMaiorQue) busca.paginas = { $gte: qtdPgsMaiorQue };
    if (qtdPgsMenorQue) busca.paginas = Object.assign({}, busca.paginas, { $lte: qtdPgsMenorQue });
    if (nomeAutor) {
        const autorEncontrado = await autor.findOne({ nome: nomeAutor });
        busca.autor = autorEncontrado;
    }
    return busca;
}

export default LivroController;