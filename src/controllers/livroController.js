import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros (req, res) {

        try {
            const listaLivros = await livro.find();
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({message: `${error.message} - Erro ao processar busca`})
        }
    }

    static async buscarLivro (req, res) {
        
        try {
            const id = req.params.id
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (error) {
            res.status(500).json({message: `${error.message} - Erro ao processar busca`})
        }
    }

    static async cadastrarLivro(req, res) {
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: "Livro criado com sucesso", livro: novoLivro });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao processar cadastro` })
        }
    }

    static async atualizarLivro (req, res) {
        
        try {
            const id = req.params.id
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao processar atualização` })
        }
    }

    static async deletarLivro (req, res) {
        
        try {
            const id = req.params.id
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Erro ao processar exclusão` })
        }
    }

};

export default LivroController;