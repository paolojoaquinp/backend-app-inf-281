const User = require('../models/usuarios');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');


module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Users: ${data}`);
            return res.status(200).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success:false,
                message: 'Error al obtener los mensajes'
            });
        }
    },

    async register(req, res ,next) {
        try {
            const user = req.body;
            const data = await User.create(user);

            return res.status(201).json({
                success:true,
                message: 'El registro se realizo correctamente',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status({
                success: false,
                message: 'Hubo un error con el registro del user',
                error: error
            });
        }
    },
    // login de usuario con campo session_token y usando jwt
    async login(req, res, next) {
        try {
            const user = req.body;
            console.log(`Datos enviados del usuario: ${JSON.stringify(user)}`);
            const data = await User.findByEmail(user.email);
            console.log(`Usuario: ${data.email}`);
            if(data) {
                if(User.isPasswordMatched(user.password, data.password)) {
                    const token = jwt.sign({
                        id: data.id,
                        email: data.email
                    }, keys.secretOrKey, {
                        expiresIn: 60 * 60
                    });
                    await User.updateToken(data.id, token);
                    return res.status(201).json({
                        id: data.id,
                        success: true,
                        message: 'El usuario se ha logueado correctamente',
                        token: token
                    });
                }
            }
            return res.status(401).json({
                success: false,
                message: 'El usuario o la contraseña son incorrectos'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de loguear al usuario',
                error: error
            });
        }
    },
    async logout(req,res,next) {
        try {
            const id = req.body.id;
            await User.updateToken(id, null);
            return res.status(201).json({
                success: true,
                message: 'La sesion del usuario se ha cerrado correctamente',
            });   
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de cerrar sesion',
                error: error
            });   
        }
    },
    async findById(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.findByUserId(id);    
            console.log(`Usuario: ${data}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener el usuario por ID'
            });
        }
    },
    async update(req, res, next) {
        try {
            
            const user = req.body;
            console.log(`Datos enviados del usuario: ${JSON.stringify(user)}`);
            await User.update(user);

            return res.status(201).json({
                success: true,
                message: 'Los datos del usuario se actualizaron correctamente'
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualizacion de datos del usuario',
                error: error
            });
        }
    },
    
};