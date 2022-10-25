module.exports = app =>{
    app.post('/signup',app.api.user.save)
    app.post('/signin',app.api.auth.signIn)
    app.post('/validateToken',app.api.auth.validateToken)

    app.route('/users')
    .all(app.config.passport.authenticate())
    .post(app.api.user.save)

}