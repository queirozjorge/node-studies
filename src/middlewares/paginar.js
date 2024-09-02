async function paginar(req, res, next) {
    const { limite = 5, pagina = 1, ordenacao = '_id:-1' } = req.query;
    const resultado = req.resultado;
    let [ campoOrdenacao, ordem ] = ordenacao.split(':');
        if (limite <= 0 || pagina <= 0) {
            next(new RequisicaoIncorreta('Parâmetros limite ou página não podem ser menores ou iguais a zero'));
        } else {
            try {
                const resultadoPaginado = await resultado
                    .find()
                    .sort({ [campoOrdenacao]: Number.parseInt(ordem) })
                    .skip((pagina - 1) * limite)
                    .limit(limite);
                res.status(200).json(resultadoPaginado);
            } catch (error) {
                next(error);
            }
        }
}

export default paginar;