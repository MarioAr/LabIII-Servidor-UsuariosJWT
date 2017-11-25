let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    cors        = require("cors");
    rutas       = require("./modulos/rutas");

let port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static('public'));

app.use('/login', rutas.login);

app.use('/usuarios', rutas.usuarios);

/**
 * A partir de aqui, todas las rutas seran verificadas via JWT
 * y estara disponible el paylaod del token en el req.user
 */
app.use(rutas.jwt);

app.use('/usuariosjwt', rutas.usuarios);

app.listen(port, () => {console.log('Servidor en puerto', port);})