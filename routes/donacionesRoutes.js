const DonacionesController = require('../controllers/donacionesController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/donaciones/getAll', DonacionesController.getAll);
    app.post('/api/donaciones/create', DonacionesController.register);
    app.get('/api/donaciones/findById/:id', DonacionesController.findById);
    app.put('/api/donaciones/update', DonacionesController.update);
    app.delete('/api/donaciones/remove/:id', DonacionesController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}