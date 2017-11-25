let router = require('express').Router({
    caseSensitive: false,
    mergeParams: true
}),
jwt    = require("../jwt");

module.exports = router;
/**
 * Middleware para verificar JWT
 */
router.use( (req, res, next) => {
    jwt.verificarToken(req.header('token'), ( err, payload ) => {
        if ( err ) {
            res.json({rta: 0, msj: "Error de autentificacion.", err: err});
            return;
        }

        req.user = payload;
        next();
    });
});