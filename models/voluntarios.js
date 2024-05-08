const db = require('../config/config');

const Voluntario = {}


Voluntario.getAll = () => {
    const sql = `
    SELECT
        v.*,
        us.nombre,
        us.paterno,
        us.materno,
        us.email
    FROM
        voluntarios as v
    INNER JOIN usuarios us ON v.idUser = us.id
    ORDER BY v.id ASC
    `;
    return db.manyOrNone(sql);
}

Voluntario.getById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        voluntarios
    WHERE
        idUser = $1
    `;

    return db.oneOrNone(sql,userId);
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