let mysql = require('mysql'), connection;
const CONF = require('../../configuracion');

/**
 * Genera una conexion  la BD
 */
function crearConexion()
{
    connection = mysql.createConnection({
        host     : CONF.HOST,
        user     : CONF.USER,
        password : CONF.PASSWORD,
        database : CONF.DATABASE
    });
    // connection.on('error', function(err) {
    //     console.log('Error', err.code);
    // });
}

module.exports.listar = listar;
/**
 * Lista todos los usuarios
 */
function listar()
{
    crearConexion();
    let query = 'SELECT * from usuarios';
    return new Promise((resolve, reject) => {
        connection.query(query, function (error, results, fields) {
            if (error)
                return reject(error);
            
            return resolve(results);
            
        });
        
        connection.end();
    });
}

module.exports.listarPorId = listarPorId;
/**
 * Lista el usuario indicado
 * @param {*} id id del usuario
 */
function listarPorId( id )
{
    crearConexion();

    var query = "select * from usuarios where `id` = ?";
    // query = query + connection.escape(id);

    return new Promise( (resolve, reject ) => {
        connection.query({
            sql: query,
            timeout: 40000, // 40s
            values: [id]
          }, function (error, results, fields) {
            if (error)
                return reject(error);

            return resolve(results);
          });
        
        connection.end();
    });
}

module.exports.cargar = cargar;
/**
 * Carga un usuario
 * @param {*} user 
 */
function cargar( user )
{
    crearConexion();

    var query = "INSERT INTO usuarios VALUES ( null, ?, ?, ?, ? )";

    return new Promise( (resolve, reject ) => {
        
        connection.query({
            sql: query,
            timeout: 40000, // 40s
            values: [ user.nombre || '', user.email || '', user.legajo || 0, user.clave || "123" ]
          }, function (error, results, fields) {
            if (error)
                return reject(error);

            return resolve(results.affectedRows);
          });
        
        connection.end();
    });
}

module.exports.modificar = modificar;
/**
 * Modifica un usuario.
 * @param {*} user 
 */
function modificar( user )
{
    crearConexion();
    console.log(user);
    var query = "update usuarios set nombre = ?, email = ?, legajo = ?, clave = ? where id = ?";

    return new Promise( (resolve, reject ) => {
        
        connection.query({
            sql: query,
            timeout: 40000, // 40s
            values: [ user.nombre, user.email, user.legajo, user.clave, user.id ]
          }, function (error, results, fields) {
            if (error){
                return reject(error);
            }
            return resolve(results.affectedRows);
          });
        
        connection.end();
    });
}
module.exports.borrar = borrar;
function borrar( id )
{
    crearConexion();

    var query = "delete from usuarios where id = ?";

    return new Promise( (resolve, reject ) => {
        
        connection.query({
            sql: query,
            timeout: 40000, // 40s
            values: [ id ]
          }, function (error, results, fields) {
            if (error){
                return reject(error);
            }
            return resolve(results.affectedRows);
          });
        
        connection.end();
    });
}

module.exports.login = login;
/**
 * Busca el usuario y clave
 * @param {*} user 
 */
function login( user )
{
    crearConexion();
    let query = 'SELECT * FROM usuarios WHERE email = ? AND clave = ?';
    return new Promise((resolve, reject) => {
        connection.query({
            sql: query,
            timeout: 40000, // 40s
            values: [ user.email, user.clave ]
          }, function (error, results, fields) {
            if (error){
                return reject(error);
            }

            return resolve(results);
        });
        
        connection.end();
    });
}