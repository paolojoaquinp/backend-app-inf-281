const notificacionesController = require('../controllers/notificacionesController');

class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connect', async (socket) => {
           /*  if(!valido) {
                console.log('socket no identificado');
                return socket.disconnect();
            } */
            const data = await notificacionesController.getAll();
            this.io.emit('lista-notificaciones', data);

            socket.on('nueva-notificacion', async (data) => {
                const notificacion = await notificacionesController.register(data.data);
                this.io.to(data.para).emit('nueva-notificacion', notificacion);
                this.io.to(data.de).emit('nueva-notificacion', notificacion);
            });

            socket.on('disconnect', async() => {
                this.io.emit( 'lista-notificaciones', await notificacionesController.getAll());
            })
        })
    }
}

module.exports = Sockets;