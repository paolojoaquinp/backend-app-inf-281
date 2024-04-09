const db = require('../config/config');

const Benficiario = {}


Benficiario.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        beneficiarios
    ORDER BY id ASC 
    `;
    return db.manyOrNone(sql);
}

Benficiario.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        beneficiarios
    WHERE
        idUser = $1
    `;

    return db.manyOrNone(sql,userId);
}


Benficiario.findByUserId = (id) => {
    const sql = `
    SELECT
        id
        idUser,
    FROM 
        beneficiarios 
    WHERE
        id = $1
    GROUP BY
        id
    `
    return db.oneOrNone(sql, id);
}
Benficiario.create = (norma) => {
    const sql = `
        INSERT INTO beneficiarios (
            idUser
        )
        VALUES($1) RETURNING id
    `;
    return db.oneOrNone(sql,[
        norma.idUser,
    ]);
}

Benficiario.update = (norma) => {
    const sql = `
        UPDATE
            beneficiarios
        SET
            idUser = $2
        WHERE
            id = $1
    `;
    return db.none(sql,[
        norma.id,
        norma.idUser
    ]);

}
Benficiario.remove = (id) => {
    const sql = `
        DELETE FROM beneficiarios
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = Benficiario;