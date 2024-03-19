const EventosController = require('../controllers/eventoController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/evento/getAll', EventosController.getAll);
    app.post('/api/evento/create', EventosController.register);
    app.get('/api/evento/findById/:id', EventosController.findById);
    app.put('/api/evento/update', EventosController.update);
    app.delete('/api/evento/remove/:id', EventosController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}