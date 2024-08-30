import mongoose from "mongoose";

function manipuladorDeErros(error, req, res, next) {
    if(error instanceof mongoose.Error.CastError) {
        return res.status(400).json({message: 'Um ou mais dados fornecidos estao incorretos'});
    }
    return res.status(500).json({message: `${error.message} - Erro ao processar busca`});
}

export default manipuladorDeErros;