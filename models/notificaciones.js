const db = require('../config/config');

const Notificacion = {}

Notificacion.read = (idNotification)  => {
    const sql = `
        UPDATE
            notificaciones
        SET
            isread = $2
        WHERE
            id = $1
    `;
    return db.none(sql,[
        idNotification,
        true
    ]);
}

Notificacion.getByType = (tipo) => {
    const sql = `
        SELECT 
            *
        FROM
            notificaciones
        WHERE
            tipo = $1
        ORDER BY
            id
    `;
    return db.manyOrNone(sql, tipo);
}

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
        receiver_id = $1
    ORDER BY id ASC
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
       isread
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
            tipo,
            createdat,
            isread
        )
        VALUES($1, $2, $3, $4, $5, $6) RETURNING id
    `;
    return db.oneOrNone(sql,[
        norma.sender_id,
        norma.receiver_id ?? 4,
        norma.message,
        norma.tipo,
        new Date(),
        false
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