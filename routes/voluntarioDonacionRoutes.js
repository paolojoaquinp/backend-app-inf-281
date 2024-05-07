const VoluntarioDonacionesController = require('../controllers/voluntarioDonacionController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/voluntarioDonacion/getAll', VoluntarioDonacionesController.getAll);
    app.post('/api/voluntarioDonacion/create', VoluntarioDonacionesController.register);
    app.get('/api/voluntarioDonacion/findById/:id', VoluntarioDonacionesController.findById);
    app.put('/api/voluntarioDonacion/update', VoluntarioDonacionesController.update);
    app.delete('/api/voluntarioDonacion/remove/:id', VoluntarioDonacionesController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}