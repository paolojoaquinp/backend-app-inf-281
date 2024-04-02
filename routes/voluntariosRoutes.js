const VoluntariosController = require('../controllers/voluntariosController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/voluntario/getAll', VoluntariosController.getAll);
    app.post('/api/voluntario/create', VoluntariosController.register);
    app.get('/api/voluntario/findById/:id', VoluntariosController.findById);
    app.put('/api/voluntario/update', VoluntariosController.update);
    app.delete('/api/voluntario/remove/:id', VoluntariosController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}