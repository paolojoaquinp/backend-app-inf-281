const AdministradorController = require('../controllers/administradoresController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/administrador/getAll', AdministradorController.getAll);
    app.post('/api/administrador/create', AdministradorController.register);
    app.get('/api/administrador/findById/:id', AdministradorController.findById);
    app.put('/api/administrador/update', AdministradorController.update);
    app.delete('/api/administrador/remove', AdministradorController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}