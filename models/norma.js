const db = require('../config/config');

const Norma = {}

Norma.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        normas
    WHERE
        id_user = $1
    `;

    return db.manyOrNone(sql,userId);
}


Norma.findByUserId = (id) => {
    const sql = `
    SELECT
        id
        id_user,
        titulo,
        descripcion,
        created_at
    FROM 
        normas 
    WHERE
        id = $1
    GROUP BY
        id
    `
    return db.oneOrNone(sql, id);
}
Norma.create = (norma) => {
    const sql = `
        INSERT INTO normas (
            id_user,
            titulo,
            descripcion,
            createdAt
        )
        VALUES($1, $2, $3, $4) RETURNING id
    `;
    return db.none(sql,[
        norma.idUser,
        norma.titulo,
        norma.descripcion,
        new Date()
    ]);
}

Norma.update = (norma) => {
    const sql = `
        UPDATE
            normas
        SET
            id_user = $2,
            titulo = $3,
            descripcion = $4
        WHERE
            id = $1
    `;
    return db.none(sql,[
        norma.id,
        norma.idUser,
        norma.titulo,
        norma.descripcion,
        new Date()
    ]);

}
Norma.remove = (id, idUser) => {
    const sql = `
        DELETE FROM normas
        WHERE id = $1 AND id_user = $2;
    `;
    return db.none(sql,[
        id,
        idUser
    ]);
}



module.exports = Norma;