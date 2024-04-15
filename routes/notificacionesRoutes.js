const NotificacionesController = require('../controllers/notificacionesController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/notificacion/getAll', NotificacionesController.getAll);
    app.post('/api/notificacion/create', NotificacionesController.register);
    app.get('/api/notificacion/findById/:id', NotificacionesController.findById);
    app.put('/api/notificacion/update', NotificacionesController.update);
    app.delete('/api/notificacion/remove/:id', NotificacionesController.remove)

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}