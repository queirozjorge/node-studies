class ErroBase extends Error {
    constructor(mensagem = 'Erro interno do servidor', status = 500) {
        super();
        this.message = mensagem;
        this.status = status;
    }

    enviarResposta(res) {
        return res.status(this.status).json({
            mensage: this.message,
            status: this.status
        });
    }
}

export default ErroBase;