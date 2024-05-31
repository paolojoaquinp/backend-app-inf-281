const db = require('../config/config');

const Solicitud = {}

Solicitud.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        solicitud
    WHERE
        idBeneficiario = $1
    `;

    return db.manyOrNone(sql,userId);
}

Solicitud.getAll = () => {
    const sql = `
    SELECT
        s.*, 
        us.nombre,
        us.email
    FROM
        solicitud as s
    INNER JOIN beneficiarios ben ON s.idbeneficiario = ben.iduser
    INNER JOIN usuarios us ON ben.iduser = us.id
    ORDER BY s.id DESC
    `;

    return db.manyOrNone(sql);
}

Solicitud.getById = (id) => {
    const sql = `
    SELECT
        b.*, 
        ben.iduser as idBeneficiario,
        us.nombre,
        us.paterno,
        us.materno,
        us.email
    FROM
        solicitud as b
    INNER JOIN beneficiarios ben ON b.idbeneficiario = ben.iduser
    INNER JOIN usuarios us ON ben.iduser = us.id
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

Solicitud.getByUserId = (idDonante) => {
    const sql = `
    SELECT
        b.*, 
        ben.iduser as idBeneficiario,
        us.nombre,
        us.paterno,
        us.materno,
        us.email
    FROM
        solicitud as b
    INNER JOIN beneficiarios ben ON b.idbeneficiario = ben.iduser
    INNER JOIN usuarios us ON ben.iduser = us.id
        WHERE
        b.idbeneficiario = $1
    `;

    return db.manyOrNone(sql, idDonante);
}

Solicitud.create = (solicitud) => {
    const sql = `
        INSERT INTO solicitud (
            idBeneficiario,
            descripcion,
            estado,
            fechaRecoger
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id
    `;
    return db.oneOrNone(sql,[
        solicitud.idBeneficiario,
        solicitud.descripcion,
        solicitud.estado,
        solicitud.fechaRecoger ?? new Date()
    ]);
}

Solicitud.update = (solicitud) => {
    const sql = `
        UPDATE
            solicitud
        SET
            idBeneficiario = $2,
            descripcion = $3,
            estado = $4,
            fechaRecoger = $5
        WHERE
            id = $1
    `;
    return db.none(sql,[
        solicitud.id,
        solicitud.idBeneficiario,
        solicitud.descripcion,
        solicitud.estado,
        solicitud.fechaRecoger
    ]);

}
Solicitud.remove = (id) => {
    const sql = `
        DELETE FROM solicitud
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = Solicitud;