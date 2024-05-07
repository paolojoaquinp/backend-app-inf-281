const ProductoController = require('../controllers/productoController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/producto/getAll', ProductoController.getAll);
    app.post('/api/producto/create', ProductoController.register);
    app.get('/api/producto/findById/:id', ProductoController.findById);
    app.put('/api/producto/update', ProductoController.update);
    app.delete('/api/producto/remove/:id', ProductoController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}