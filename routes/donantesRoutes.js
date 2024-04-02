const DonantesController = require('../controllers/donantesController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/donante/getAll', DonantesController.getAll);
    app.post('/api/donante/create', DonantesController.register);
    app.get('/api/donante/findById/:id', DonantesController.findById);
    app.put('/api/donante/update', DonantesController.update);
    app.delete('/api/donante/remove/:id', DonantesController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}