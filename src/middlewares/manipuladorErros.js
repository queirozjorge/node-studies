import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import JsonMalFormado from "../erros/JsonMalFormado.js";

function manipuladorDeErros(error, req, res, next) {
    console.error(`${new Date().toISOString()} [ERROR]: ${error}`);
    if(error instanceof mongoose.Error.CastError) {
        return new RequisicaoIncorreta().enviarResposta(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        return new ErroValidacao(error).enviarResposta(res);
    } else if(error instanceof SyntaxError) {
        return new JsonMalFormado().enviarResposta(res);
    } else if(error instanceof ErroBase) {
        return error.enviarResposta(res);
    }
    return new ErroBase().enviarResposta(res);
}

export default manipuladorDeErros;