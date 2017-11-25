let router = require('express').Router({
        caseSensitive: false,
        mergeParams: true
    }),
    db      = require('../db');

module.exports = router;
/**
 * Ruta listar
 */
router.get('/', (req, res) => {
    try {
        db.listar()
        .then( data => {
            res.json( data );
        })
        .catch( err => {
            res.json( err );
        })
    } catch (error) {
        res.json( error );
    }
    
});
/**
 * Ruta listar por ID
 */
router.get('/:id', (req, res) => {
    try {
        db.listarPorId( req.params.id )
        .then( data => {
            res.json( data );
        })
        .catch( err => {
            res.json( err );
        })
    } catch (error) {
        res.json( error );
    }
    
});

/**
 * Carga un usuario
 */
router.post('/', (req, res) => {
    try {
        db.cargar( req.body )
        .then( data => {
            console.log("data", data);
            if ( data == 1 )
                res.json("Se cargo con exito");
            else
                res.json("No se pudo cargar");
        } )
        .catch( err => {
            res.json( err );
        });
    } catch (error) {
        res.json("err 2",error);
    }
    
});
/**
 * Modifica un usuario
 */
router.put('/', (req, res) => {
    
    try {
        db.modificar( req.body )
        .then( data => {
            if ( data == 1 )
                res.json("Se modifico con exito");
            else
                res.json("No se pudo modificar");
        })
        .catch( err => {
            res.json( err );
        })
    } catch (error) {
        res.json(  error );
    }
});
/**
 * Ruta que borra un usuario
 */
router.delete('/', (req, res) => {
    try {
        db.borrar( req.body.id )
        .then( data => {
            if ( data == 1 )
                res.json("Se borro con exito");
            else
                res.json("No se pudo borrar");
        })
        .catch( err => {
            res.json( "err"+ err );
        })
    } catch (error) {
        res.json( "err2" + error );
    }
});