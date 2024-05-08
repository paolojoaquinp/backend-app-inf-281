const db = require('../config/config');

const Donacion = {}

Donacion.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        donacion
    WHERE
        id_admin = $1
    `;

    return db.manyOrNone(sql,userId);
}

Donacion.getAll = () => {
    const sql = `
    SELECT
        d.*, 
        us.nombre,
        us.email
    FROM
        donacion as d
    INNER JOIN donantes don ON d.iddonante = don.iduser
    INNER JOIN usuarios us ON don.iduser = us.id
    ORDER BY d.id DESC
    `;

    return db.manyOrNone(sql);
}

Donacion.getById = (id) => {
    const sql = `
    SELECT
        d.*, 
        don.iduser as idDonante,
        us.nombre,
        us.paterno,
        us.materno,
        us.email
    FROM
        donacion as d
    INNER JOIN donantes don ON d.iddonante = don.iduser
    INNER JOIN usuarios us ON don.iduser = us.id
    WHERE
        d.id = $1
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

Donacion.getByUserId = (idDonante) => {
    const sql = `
    SELECT
        d.*, 
        don.iduser as idDonante,
        us.nombre,
        us.paterno,
        us.materno,
        us.email
    FROM
        donacion as d
    INNER JOIN donantes don ON d.iddonante = don.iduser
    INNER JOIN usuarios us ON don.iduser = us.id
    WHERE
        d.iddonante = $1
    `;

    return db.manyOrNone(sql, idDonante);
}

Donacion.create = (donacion) => {
    const sql = `
        INSERT INTO donacion (
            idDonante,
            estado,
            lat,
            lng,
            fechaentregar,
            fechaRecoger,
            createdAt
        )
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id
    `;
    return db.oneOrNone(sql,[
        donacion.idDonante,
        donacion.estado,
        donacion.lat,
        donacion.lng,
        donacion.fechaEntregar ?? new Date(),
        donacion.fechaRecoger ?? new Date(),
        new Date()
    ]);
}

Donacion.update = (donacion) => {
    const sql = `
        UPDATE
            donacion
        SET
            idDonante = $2,
            estado = $3,
            lat = $4,
            lng = $5,
            fechaRecoger = $6
        WHERE
            id = $1
    `;
    return db.none(sql,[
        donacion.id,
        donacion.idDonante,
        donacion.estado,
        donacion.lat,
        donacion.lng,
        donacion.fechaRecoger
    ]);

}
Donacion.remove = (id) => {
    const sql = `
        DELETE FROM donacion
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = Donacion;