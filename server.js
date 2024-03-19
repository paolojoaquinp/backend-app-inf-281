const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

/* 
    RUTAS
*/
const norma = require('./routes/normasRoutes');
const usuario = require('./routes/usuariosRoutes');
const admin = require('./routes/administradoresRoutes');
const evento = require('./routes/eventoRoutes');

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

// '192.168.1.6' mi ip actual
server.listen(3001, 'localhost', function() {
    console.log('Aplicacion de NodeJS '+port+' iniciada.....');
});

// Error Handler
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send('Algo salio mal!, '+err.message);
});

module.exports = {
    app: app,
    server: server
};