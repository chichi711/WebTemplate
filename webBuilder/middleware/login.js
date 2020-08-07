var { Error } = require('../response')
var login_render = function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.redirect('/')
    }
}
var login_api = function (req, res, next) {
    if(req.session.user) {
        next();
    } else {
        res.end(
            JSON.stringify(new Error('permission deined'))
        )
    }
}

module.exports = {
    login_render,
    login_api
}