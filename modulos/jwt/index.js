let jwt = require('jsonwebtoken');

const SECRET = "utnfra";
const TIEMPO_DEFECTO = 60*60;

module.exports.getToken = getToken;
/**
 * Genera un JWT
 * @param {*} payload Objeto para formar el payload
 * @param {*} seg cantidad de segundos de duracion del JWT, una hora por defecto.
 */
function getToken( payload, seg ) {
    
    let o = {
        nombre: payload.nombre,
        email:  payload.email,
        legajo: payload.legajo,
        exp:    Math.floor( Date.now() / 1000 )
    }
    if (!seg)
        o.exp +=  TIEMPO_DEFECTO;//una hora
    else
        o.exp += isNaN(parseInt(seg)) ? TIEMPO_DEFECTO: parseInt(seg);

    try {
        return jwt.sign(o, SECRET);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports.verificarToken = verificarToken;
/**
 * Verifica que el token sea valido
 * @param {*} token 
 * @param {*} callback 
 */
function verificarToken( token, callback ) {
    jwt.verify( token, SECRET, ( err, decoded ) => {
        if ( err ) {
            callback(err);
            return null;        
        }
        
        callback( null, decoded );        
    });
}