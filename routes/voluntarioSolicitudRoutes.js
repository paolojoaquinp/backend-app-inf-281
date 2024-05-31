const VoluntarioSolicitudController = require('../controllers/voluntarioSolicitudController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/voluntarioSolicitud/getAll', VoluntarioSolicitudController.getAll);
    app.post('/api/voluntarioSolicitud/create', VoluntarioSolicitudController.register);
    
    app.get('/api/voluntarioSolicitud/findById/:id', VoluntarioSolicitudController.findById);
    app.get('/api/voluntarioSolicitud/findOneById/:id', VoluntarioSolicitudController.findOneById);
    
    app.put('/api/voluntarioSolicitud/update', VoluntarioSolicitudController.update);
    app.delete('/api/voluntarioSolicitud/remove/:id', VoluntarioSolicitudController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}