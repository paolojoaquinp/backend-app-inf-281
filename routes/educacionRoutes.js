const EducacionController = require('../controllers/educacionController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/educacion/getAll', EducacionController.getAll);
    app.post('/api/educacion/create', EducacionController.register);
    app.get('/api/educacion/findById/:id', EducacionController.findById);
    app.put('/api/educacion/update', EducacionController.update);
    app.delete('/api/educacion/remove/:id', EducacionController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}