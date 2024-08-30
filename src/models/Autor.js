import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    id: { type:  mongoose.Schema.Types.ObjectId },
    nome: { 
        type: String, 
        required: [true, 'Nome do(a) autor(a) é obrigatório'] },
    nacionalidade: {
        required: [true, 'Nacionalidade do autor(a) obrigatória'], 
        type: String,
        validate: {
            validator: (valor) => {
                return valor === 'BR';
            },
            message: 'São aceitos apenas autores de nacionalidade BR'
        }
    }
}, { versionKey: false });

const autor = mongoose.model("autores", autorSchema);

export { autor, autorSchema };
