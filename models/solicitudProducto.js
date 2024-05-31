const db = require('../config/config');

const SolicitudProducto = {}

SolicitudProducto.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        solicitudProducto
    WHERE
        idBeneficiario = $1
    `;

    return db.manyOrNone(sql,userId);
}

SolicitudProducto.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        solicitudProducto
    ORDER BY id DESC
    `;

    return db.manyOrNone(sql);
}

SolicitudProducto.getById = (id) => {
    const sql = `
    SELECT
        s.*, 
        p.nombre,
        p.descripcion
    FROM
        solicitudProducto as s
    INNER JOIN productos p ON s.idproducto = p.id
    WHERE
        b.id = $1
    `;

    return db.oneOrNone(sql, id);
        /* .then(result => {
            if (result) {
                return result.id;
            } else {
                return null;
            }
        }); */
}

SolicitudProducto.getByUserId = (idSolicitud) => {
    const sql = `
    SELECT
        s.*, 
        p.nombre,
        p.descripcion
    FROM
        solicitudProducto as s
    INNER JOIN productos p ON s.idproducto = p.id
    WHERE
        d.idsolicitud = $1
    `;

    return db.manyOrNone(sql, idSolicitud);
}

SolicitudProducto.create = (solicitudProducto) => {
    const sql = `
        INSERT INTO solicitudProducto (
            idSolicitud,
            nombre,
            cantidad
        )
        VALUES ($1,$2,$3)
    `;
    return db.oneOrNone(sql,[
        solicitudProducto.idSolicitud,
        solicitudProducto.nombre,
        solicitudProducto.cantidad
    ]);
}

SolicitudProducto.update = (solicitudProducto) => {
    const sql = `
        UPDATE
            solicitudProducto
        SET
            idSolicitud = $2,
            idProducto = $3,
            cantidad = $4
        WHERE
            id = $1
    `;
    return db.none(sql,[
        solicitudProducto.id,
        solicitudProducto.idSolicitud,
        solicitudProducto.idProducto,
        solicitudProducto.cantidad
    ]);

}
SolicitudProducto.remove = (id) => {
    const sql = `
        DELETE FROM solicitudProducto
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = SolicitudProducto;