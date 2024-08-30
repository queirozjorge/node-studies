import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { 
        type: String, 
        required: [true, 'Título é obrigatório'] 
    },
    editora: { 
        type: String,
        required: [true, 'Editora é obrigatório'],
        enum: {values: ['Casa do Código', 'Clássicos', 'Alura'], message: 'Editora {VALUE} não é permitida'}
     },
    preco: { type: Number },
    paginas: { 
        type: Number,
        min: [10, 'O número de páginas deve estar entre 10 e 5000'],
        max: [5000, 'O número de páginas deve estar entre 10 e 5000'] 
    },
    autor: {
        type: autorSchema,
        required: [true, 'Autor(a) obrigatório']
    }
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;