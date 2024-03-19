const db = require('../config/config');

// fill like norma.js model but for administradores table
const Administradores = {}

Administradores.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        administradores
    WHERE
        idUser = $1
    `;

    return db.manyOrNone(sql,userId);
}

Administradores.findByUserId = (id) => {
    const sql = `
    SELECT
        id
        idUser
    FROM 
        administradores 
    WHERE
        id = $1
    GROUP BY
        id
    `
    return db.oneOrNone(sql, id);
}
Administradores.create = (administrador) => {
    const sql = `
        INSERT INTO administradores (
            idUser
        )
        VALUES($1) RETURNING id
    `;
    return db.none(sql,[
        administrador.idUser
    ]);
}

Administradores.update = (administrador) => {
    const sql = `
        UPDATE
            administradores
        SET
            idUser = $2
        WHERE
            id = $1
    `;
    return db.none(sql,[
        administrador.id,
        administrador.idUser
    ]);
}

Administradores.remove = (id) => {
    const sql = `
        DELETE FROM
            administradores
        WHERE
            id = $1
    `;
    return db.none(sql, id);
}

module.exports = Administradores;