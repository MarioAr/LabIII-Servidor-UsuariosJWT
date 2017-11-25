let router = require('express').Router({
        caseSensitive: false,
        mergeParams: true
    }),
    db     = require('../db'),
    jwt    = require("../jwt");

module.exports = router;
/**
 * Si existe el usuario y clave genera un JWT y rta: 1.
 * Si no existe devuelve rta: 0
 */
router.post('/', ( req, res ) => {
    let rta = { rta:0 }
    try {
        db.login( req.body )
        .then( data => {
            if ( data.length == 1) {
                
                let to = jwt.getToken(data[0], req.body.seg);
                if ( to ) {
                    rta.token = to;
                    rta.rta = 1;
                }
            }
            
            res.json( rta );
        })
        .catch( error => {
            res.json( error );
        })
    } catch (error) {
        res.json(error);
    }
});