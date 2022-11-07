module.exports = app =>{
    app.post('/signup',app.api.user.save)
    app.post('/login',app.api.auth.signIn)
    app.post('/validateToken',app.api.auth.validateToken)

    app.route('/users')
    .all(app.config.passport.authenticate())
    .post(app.api.user.save)

    
    // *** INSUMO ***
    app.route('/insumo/:id')
    .get(app.api.insumo.getInsumoById)
    .put(app.api.insumo.save)
    .delete(app.api.insumo.deleteInsumo)

    app.route('/insumo')
    .post(app.api.insumo.save)
    .get(app.api.insumo.getAllInsumos)
}