const db = require('../config/config');

const Voluntario = {}


Voluntario.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        voluntarios
    ORDER BY id ASC 
    `;
    return db.manyOrNone(sql);
}

Voluntario.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        voluntarios
    WHERE
        idUser = $1
    `;

    return db.manyOrNone(sql,userId);
}


Voluntario.findByUserId = (id) => {
    const sql = `
    SELECT
        id
        idUser,
    FROM 
        voluntarios 
    WHERE
        id = $1
    GROUP BY
        id
    `
    return db.oneOrNone(sql, id);
}
Voluntario.create = (norma) => {
    const sql = `
        INSERT INTO voluntarios (
            idUser
        )
        VALUES($1) RETURNING id
    `;
    return db.oneOrNone(sql,[
        norma.idUser,
    ]);
}

Voluntario.update = (norma) => {
    const sql = `
        UPDATE
            voluntarios
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
Voluntario.remove = (id) => {
    const sql = `
        DELETE FROM voluntarios
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = Voluntario;