const NotificationesController = require('../controllers/notificacionesController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/notificacion/getAll', NotificationesController.getAll);
    app.post('/api/notificacion/create', NotificationesController.register);
    app.get('/api/notificacion/findById/:id', NotificationesController.findById);
    app.put('/api/notificacion/update', NotificationesController.update);
    app.delete('/api/notificacion/remove/:id', NotificationesController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}