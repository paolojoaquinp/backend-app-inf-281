const UsuariosController = require('../controllers/usuariosController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/usuarios/getAll', UsuariosController.getAll);
    app.post('/api/usuarios/create', UsuariosController.register);
    app.post('/api/usuarios/login', UsuariosController.login);
    app.get('/api/usuarios/findById/:id', UsuariosController.findById);

    app.post('/api/usuarios/logout', UsuariosController.logout);
    app.put('/api/usuarios/update', UsuariosController.update)

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}