module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/login', app.api.auth.signIn)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)


    // *** CATEGORIA INSUMO ***
    app.route('/categoriaInsumo/:id')
        .get(app.api.insumo.getCategoriaInsumoById)
        .put(app.api.insumo.saveCategoria)
        .delete(app.api.insumo.deleteCategoriaInsumo)

    app.route('/categoriaInsumo')
        .post(app.api.insumo.saveCategoria)
        .get(app.api.insumo.getAllCategoriaInsumos)

    // *** FIM CATEGORIA INSUMO ***


    // ***  INSUMO ***
    app.route('/insumo/:id')
        .get(app.api.insumo.getInsumoById)
        .put(app.api.insumo.saveInsumo)
        .delete(app.api.insumo.deleteInsumo)

    app.route('/insumo')
        .post(app.api.insumo.saveInsumo)
        .get(app.api.insumo.getAllInsumos)

    // *** FIM  INSUMO ***

    // ***  PRODUTO ***

    app.route('/produto')
        .post(app.api.produto.saveProduto)
        .get(app.api.produto.getAllProdutos)

    app.route('/produto/:id')
        .put(app.api.produto.saveProduto)
        .get(app.api.produto.getProdutoById)
    // ***  PRODUTO ***

    // *** CATEGORIA PRODUTO ***
    app.route('/categoriaProduto/:id')
        .get(app.api.produto.getCategoriaProdutoById)
        .put(app.api.produto.saveCategoria)
        .delete(app.api.produto.deleteCategoriaProduto)

    app.route('/categoriaProduto')
        .post(app.api.produto.saveCategoria)
        .get(app.api.produto.getAllCategoriaProdutos)

    // *** FIM CATEGORIA PRODUTO ***

    // *** TIPOS PRODUTO ***
    app.route('/tiposProdutos/:id')
        .get(app.api.tipos_tamanhos.getTiposProdutoById)
        .put(app.api.tipos_tamanhos.saveTipos)
        .delete(app.api.tipos_tamanhos.deleteTiposProduto)

    app.route('/tiposProdutos')
        .post(app.api.tipos_tamanhos.saveTipos)
        .get(app.api.tipos_tamanhos.getAllTiposProdutos)

    // *** FIM TIPOS PRODUTO ***

    // *** TAMANHOS PRODUTO ***
    app.route('/tamanhosProdutos/:id')
        .get(app.api.tipos_tamanhos.getTamanhosProdutoById)
        .put(app.api.tipos_tamanhos.saveTamanhos)
        .delete(app.api.tipos_tamanhos.deleteTamanhosProduto)

    app.route('/tamanhosProdutos')
        .post(app.api.tipos_tamanhos.saveTamanhos)
        .get(app.api.tipos_tamanhos.getAllTamanhosProdutos)

    // *** FIM TAMANHOS PRODUTO ***

    // *** COMPLEMENTO ***
    app.route('/complemento/:id')
        .get(app.api.complemento.getComplementoById)
        .put(app.api.complemento.saveComplemento)
        .delete(app.api.complemento.deleteComplemento)

    app.route('/complemento')
        .post(app.api.complemento.saveComplemento)
        .get(app.api.complemento.getAllComplementos)

    // *** FIM COMPLEMENTO  ***

    // *** OBSERVAÇÃO ***
    app.route('/observacao/:descricao')
        .get(app.api.observacao.getObservacaoById)
        .put(app.api.observacao.saveObservacao)
        .delete(app.api.observacao.deleteObservacao)

    app.route('/observacao')
        .post(app.api.observacao.saveObservacao)
        .get(app.api.observacao.getAllObservacaos)

    // *** FIM OBSERVAÇÃO  ***
    app.route('/observacaoCategorias/:descricao')
        .put(app.api.observacao.saveObsCatProd)
        .get(app.api.observacao.getObsCatProdByDesc)

    app.route('/observacaoCategorias')
        .post(app.api.observacao.saveObsCatProd)
        .get(app.api.observacao.getAllObsCatProd)

    // *** PERGUNTAS ***

    app.route('/perguntas')
        .post(app.api.perguntas.savePergunta)
        .get(app.api.perguntas.getAllPerguntas)


    app.route('/perguntas/:id')
        .put(app.api.perguntas.savePergunta)
        .delete(app.api.perguntas.deletePergunta)
        .get(app.api.perguntas.getPerguntaById)

    app.route('/perguntasComplemento')
        .post(app.api.perguntas.savePerguntaComplemento)

    app.route('/perguntasComplemento/:id')
        .get(app.api.perguntas.getPerguntaByIdComp)
        .put(app.api.perguntas.savePerguntaComplemento)

    app.route('/perguntasObservacao')
        .post(app.api.perguntas.savePerguntaObservacao)

    app.route('/perguntasObservacao/:id')
        .put(app.api.perguntas.savePerguntaObservacao)
        .get(app.api.perguntas.getPerguntaByIdObs)

    // *** FIM PERGUNTAS ***

}