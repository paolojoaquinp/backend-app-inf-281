const SolicitudesController = require('../controllers/solicitudesController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/solicitud/getAll', SolicitudesController.getAll);
    app.post('/api/solicitud/create', SolicitudesController.register);
    app.get('/api/solicitud/findById/:id', SolicitudesController.findById);
    app.get('/api/solicitud/findByUserId/:id', SolicitudesController.findByUserId);
    app.put('/api/solicitud/update', SolicitudesController.update);
    app.delete('/api/solicitud/remove/:id', SolicitudesController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}