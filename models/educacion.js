const db = require('../config/config');

const Educacion = {}

Educacion.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        educacion
    WHERE
        id_admin = $1
    `;

    return db.manyOrNone(sql,userId);
}

Educacion.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        educacion
    ORDER BY id ASC 
    `;

    return db.manyOrNone(sql);
}

Educacion.findByUserId = (id) => {
    const sql = `
    SELECT
        id
        id_admin,
        titulo,
        descripcion,
        imagen,
        createdAt
    FROM 
        educacion 
    WHERE
        id = $1
    GROUP BY
        id
    `
    return db.oneOrNone(sql, id);
}

Educacion.create = (educacion) => {
    const sql = `
        INSERT INTO educacion (
            id_admin,
            titulo,
            descripcion,
            imagen,
            createdAt
        )
        VALUES($1, $2, $3, $4, $5) RETURNING id
    `;
    return db.oneOrNone(sql,[
        educacion.idAdministrador,
        educacion.titulo,
        educacion.descripcion,
        educacion.imagen,
        new Date()
    ])
}

Educacion.update = (educacion) => {
    const sql = `
        UPDATE
            educacion
        SET
            id_admin = $2,
            titulo = $3,
            descripcion = $4,
            imagen = $5
        WHERE
            id = $1
    `;
    return db.none(sql,[
        educacion.id,
        educacion.idAdministrador,
        educacion.titulo,
        educacion.descripcion,
        educacion.imagen
    ]);

}
Educacion.remove = (id) => {
    const sql = `
        DELETE FROM educacion
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = Educacion;