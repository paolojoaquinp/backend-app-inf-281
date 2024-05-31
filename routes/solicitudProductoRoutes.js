const SolicitudProductoController = require('../controllers/solicitudProductoController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/solicitudProducto/getAll', SolicitudProductoController.getAll);
    app.post('/api/solicitudProducto/create', SolicitudProductoController.register);
    app.get('/api/solicitudProducto/findById/:id', SolicitudProductoController.findById);
    app.get('/api/solicitudProducto/findByUserId/:id', SolicitudProductoController.findByUserId);
    app.put('/api/solicitudProducto/update', SolicitudProductoController.update);
    app.delete('/api/solicitudProducto/remove/:id', SolicitudProductoController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}