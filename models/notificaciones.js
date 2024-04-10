const db = require('../config/config');

const Notificacion = {}


Notificacion.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        notificaciones
    ORDER BY id ASC 
    `;
    return db.manyOrNone(sql);
}

Notificacion.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        notificaciones
    WHERE
        sender_id = $1
    `;

    return db.manyOrNone(sql,userId);
}

Notificacion.findByUserId = (id) => {
    const sql = `
    SELECT
       id,
       sender_id,
       receiver_id,
       message,
       createdat,
       reatat
    FROM 
        notificaciones 
    WHERE
        id = $1
    GROUP BY
        id
    `
    return db.oneOrNone(sql, id);
}
Notificacion.create = (norma) => {
    const sql = `
        INSERT INTO notificaciones (
            sender_id,
            receiver_id,
            message,
            createdAt,
            read
        )
        VALUES($1, $2, $3, $4, $5) RETURNING id
    `;
    return db.oneOrNone(sql,[
        norma.idAdministrador,
        norma.titulo,
        norma.descripcion,
        new Date()
    ]);
}

Notificacion.update = (norma) => {
    const sql = `
        UPDATE
            notificaciones
        SET
            id_admin = $2,
            titulo = $3,
            descripcion = $4
        WHERE
            id = $1
    `;
    return db.none(sql,[
        norma.id,
        norma.idAdministrador,
        norma.titulo,
        norma.descripcion,
        new Date()
    ]);

}
Notificacion.remove = (id) => {
    const sql = `
        DELETE FROM notificaciones
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = Notificacion;