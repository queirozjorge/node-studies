import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class JsonMalFormado extends RequisicaoIncorreta {
    constructor() {
        super('Malformed Json');
    }
}

export default JsonMalFormado;