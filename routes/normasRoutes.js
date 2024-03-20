const NormasController = require('../controllers/normaController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/norma/getAll', NormasController.getAll);
    app.post('/api/norma/create', NormasController.register);
    app.get('/api/norma/findById/:id', NormasController.findById);
    app.put('/api/norma/update', NormasController.update);
    app.delete('/api/norma/remove/:id', NormasController.remove)

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}