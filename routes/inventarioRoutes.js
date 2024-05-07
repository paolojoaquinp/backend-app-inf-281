const InventariosController = require('../controllers/inventarioController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/inventario/getAll', InventariosController.getAll);
    app.post('/api/inventario/create', InventariosController.register);
    app.get('/api/inventario/findById/:id', InventariosController.findById);
    app.put('/api/inventario/update', InventariosController.update);
    app.delete('/api/inventario/remove/:id', InventariosController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}