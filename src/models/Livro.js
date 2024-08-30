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
        required: [true, 'Editora é obrigatório']
     },
    preco: { type: Number },
    paginas: { type: Number },
    autor: {
        type: autorSchema,
        required: [true, 'Autor(a) obrigatório']
    }
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;