module.exports = app =>{
    app.post('/signup',app.api.user.save)
    app.post('/login',app.api.auth.signIn)
    app.post('/validateToken',app.api.auth.validateToken)

    app.route('/users')
    .all(app.config.passport.authenticate())
    .post(app.api.user.save)

    
    // *** INSUMO ***
    app.route('/insumo/:id')
    .get(app.api.insumo.getCategoriaInsumoById)
    .put(app.api.insumo.saveCategoria)
    .delete(app.api.insumo.deleteCategoriaInsumo)

    app.route('/insumo')
    .post(app.api.insumo.saveCategoria)
    .get(app.api.insumo.getAllCategoriaInsumos)
}