const db = require('../config/config');

const Evento = {}

Evento.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        eventos
    ORDER BY id ASC 
    `;
    return db.manyOrNone(sql);
}

Evento.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        eventos
    WHERE
        id_user = $1
    `;

    return db.manyOrNone(sql,userId);
}


Evento.findByUserId = (id) => {
    const sql = `
    SELECT
        id
        id_admin,
        titulo,
        descripcion,
        imagen,
        fecha,
        createdAt
    FROM 
        eventos 
    WHERE
        id = $1
    GROUP BY
        id
    `
    return db.oneOrNone(sql, id);
}

Evento.create = (evento) => {
    const sql = `
        INSERT INTO eventos (
            id_admin,
            titulo,
            descripcion,
            imagen,
            fecha,
            createdAt
        )
        VALUES($1, $2, $3, $4, $5, $6)
    `;
    return db.none(sql,[
        evento.idAdministrador,
        evento.titulo,
        evento.descripcion,
        evento.imagen,
        evento.fecha || new Date(),
        new Date()
    ])
}

Evento.update = (evento) => {
    const sql = `
        UPDATE
            eventos
        SET
            id_admin = $2,
            titulo = $3,
            descripcion = $4,
            imagen = $5,
            fecha = $6
        WHERE
            id = $1
    `;
    return db.none(sql,[
        evento.id,
        evento.idAdministrador,
        evento.titulo,
        evento.descripcion,
        evento.imagen,
        evento.fecha,
    ]);

}
Evento.remove = (id) => {
/*     const sql = `
        DELETE FROM eventos
        WHERE id = $1 AND id_admin = $2;
    `; */
    const sql = `
        DELETE FROM eventos
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = Evento;