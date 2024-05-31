const notificacionesController = require('./controllers/notificacionesController');


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const { Server } = require('socket.io');
const path     = require('path');


const Sockets = require('./models/sockets');
/* 
    RUTAS
*/
const norma = require('./routes/normasRoutes');
const usuario = require('./routes/usuariosRoutes');
const admin = require('./routes/administradoresRoutes');
const evento = require('./routes/eventoRoutes');
const educacion = require('./routes/educacionRoutes');
/* ------- */
const voluntario = require('./routes/voluntariosRoutes');
const donante = require('./routes/donantesRoutes');
const beneficiario = require('./routes/beneficiariosRoutes');
const notificacion = require('./routes/notificacionesRoutes');
const donacion = require('./routes/donacionesRoutes');
const inventario = require('./routes/inventarioRoutes');
const producto = require('./routes/productoRoutes');
const voluntarioDonacion = require('./routes/voluntarioDonacionRoutes');

const solicitud = require('./routes/solicitudesRoutes');
const solicitudProducto = require('./routes/solicitudProductoRoutes');

const voluntarioSolicitud = require('./routes/voluntarioSolicitudRoutes');
const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
// uso de passport
/* app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport); */
 

app.disable('x-powered-by');

app.set('port',port);

norma(app);
usuario(app);
admin(app);
evento(app);
educacion(app);
voluntario(app);
donante(app);
beneficiario(app);
notificacion(app);
donacion(app);
inventario(app);
producto(app);
voluntarioDonacion(app);
solicitud(app);
solicitudProducto(app);
voluntarioSolicitud(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});
// Sockets
/* new Sockets(io); */
io.on('connection', async (socket) => {
    console.log('conectado')
    const data = await notificacionesController.getAll();
    io.emit('lista-notificaciones', data);

    socket.on('nueva-notificacion', async (data) => {
        const notificacion = await notificacionesController.register(data.data);
        io.to(data.para).emit('nueva-notificacion', notificacion);
        io.to(data.de).emit('nueva-notificacion', notificacion);
    });

    socket.on('disconnect', async() => {
        io.emit( 'lista-notificaciones', await notificacionesController.getAll());
    })
});
app.use( express.static( path.resolve( __dirname, './public' ) ) );


// '192.168.1.6' mi ip actual
server.listen(3001, '127.0.0.1' || 'localhost', function() {
    console.log('Aplicacion de NodeJS '+port+' iniciada.....');
});

// Error Handler
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('Algo salio mal!, '+err.message);
});




module.exports = app;