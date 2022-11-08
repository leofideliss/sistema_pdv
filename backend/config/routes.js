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


    // *** CATEGORIA PRODUTO ***
    app.route('/categoriaProduto/:id')
        .get(app.api.produto.getCategoriaProdutoById)
        .put(app.api.produto.saveCategoria)
        .delete(app.api.produto.deleteCategoriaProduto)

    app.route('/categoriaProduto')
        .post(app.api.produto.saveCategoria)
        .get(app.api.produto.getAllCategoriaProdutos)

    // *** FIM CATEGORIA PRODUTO ***
}