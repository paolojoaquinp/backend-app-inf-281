
const BeneficiariosController = require('../controllers/beneficiariosController');
/* const passport = require('passport'); */

module.exports = (app) => {
    app.get('/api/beneficiario/getAll', BeneficiariosController.getAll);
    app.post('/api/beneficiario/create', BeneficiariosController.register);
    app.get('/api/beneficiario/findById/:id', BeneficiariosController.findById);
    app.put('/api/beneficiario/update', BeneficiariosController.update);
    app.delete('/api/beneficiario/remove/:id', BeneficiariosController.remove);

    /* app.get('/api/users/findById/:id', passport.authenticate('jwt', {session:false}), UsersController.findById); */

    /* app.put('/api/users/update',passport.authenticate('jwt',{session:false}), upload.array('image',1),UsersController.update); */
}