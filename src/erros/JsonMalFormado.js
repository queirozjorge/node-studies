import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class JsonMalFormado extends RequisicaoIncorreta {
    constructor() {
        super('Json mal formado');
    }
}

export default JsonMalFormado;