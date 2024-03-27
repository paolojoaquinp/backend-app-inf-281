const db = require('../config/config');
const crypto = require('crypto');

const Usuario = {};

Usuario.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        usuarios
    `;

    return db.manyOrNone(sql);
}
Usuario.findByUserId = (id) => {
    const sql = `
    SELECT
        U.id,
        U.nombre,
        U.paterno,
        U.materno,
        U.direccion,
        U.telefono,
        U.estado,
        U.email,
        U.password,
        U.createdAt
    FROM 
        usuarios AS U
    WHERE
        U.id = $1
    GROUP BY
        U.id
    `
    return db.oneOrNone(sql, id);
}

Usuario.update = (user) => {
    const sql = `
        UPDATE
            users
        SET
            name = $2,
            lastname = $3,
            updated_at = $4
        WHERE
            id = $1
    `;
    return db.none(sql,[
        user.id,
        user.name,
        user.lastname,
        new Date()
    ]);

}

Usuario.findByEmail = (email) => {
    const sql = `
    SELECT
        id,
        nombre,
        paterno,
        materno,
        direccion,
        telefono,
        estado,
        email,
        password,
        createdAt,
        session_token
    FROM
        usuarios
    WHERE
        email = $1
    `;
    return db.oneOrNone(sql, email);
}

//session_token new column add please
Usuario.create = (usuario) => {
    const myPasswordHashed = crypto.createHash('md5').update(usuario.password).digest('hex');
    usuario.password = myPasswordHashed

    const sql = `
        INSERT INTO usuarios(
            nombre,
            paterno,
            materno,
            direccion,
            telefono,
            estado,
            email,
            password,
            createdAt,
            session_token
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id
    `;

    return db.oneOrNone(sql, [
        usuario.nombre,
        usuario.paterno,
        usuario.materno,
        usuario.direccion,
        usuario.telefono,
        false,
        usuario.email,
        usuario.password,
        new Date(),
        usuario.session_token
    ]);
}

Usuario.updateToken = (id,token) => {
    const sql = `
        UPDATE
            usuarios
        SET
            session_token = $2
        WHERE
            id = $1
    `;
    return db.none(sql, [
        id,
        token
    ]);

}

Usuario.findById = (id, callback) => {
    const sql = `
    SELECT
            id,
            name,
            lastname,
            email,
            password,
            session_token
        FROM
            usuarios
        WHERE
            id = $1
    `;
    return db.oneOrNone(sql, id).then(user => { callback(null, user); })
}

Usuario.isPasswordMatched = (userPassword, hash) => {
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if(myPasswordHashed === hash) {
        return true;
    }
    return false;
}

module.exports = Usuario;