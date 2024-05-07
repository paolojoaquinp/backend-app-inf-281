const db = require('../config/config');

const VoluntarioDonacion = {}

VoluntarioDonacion.getAllById = (idVoluntario) => {
    const sql = `
    SELECT
        *
    FROM
        voluntariodonacion
    WHERE
        idVoluntario = $1
    `;

    return db.manyOrNone(sql,idVoluntario);
}

VoluntarioDonacion.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        voluntariodonacion 
    `;

    return db.manyOrNone(sql);
}

VoluntarioDonacion.getById = (idUser) => {
    const sql = `
    SELECT
        id,
        idUser,
        ubicacion,
        tipo,
        createdAt
    FROM 
        voluntariodonacion 
    WHERE
        idUser = $1
    `;

    return db.oneOrNone(sql, idUser)
        .then(result => {
            if (result) {
                return result.id;
            } else {
                return null;
            }
        });
}

VoluntarioDonacion.getByUserId = (idDonante) => {
    const sql = `
    SELECT
        *
    FROM 
        voluntariodonacion 
    WHERE
        idDonante = $1
    GROUP BY
        id
    `;

    return db.manyOrNone(sql, idDonante);
}

VoluntarioDonacion.create = (voluntariodonacion) => {
    const sql = `
        INSERT INTO voluntariosdonacion (
            iddonacion,
            idvoluntario,
            estado
        )
        VALUES($1, $2, $3) RETURNING id
    `;
    return db.oneOrNone(sql,[
        voluntariodonacion.idDonacion,
        voluntariodonacion.idVoluntario,
        voluntariodonacion.estado,
    ]);
}

VoluntarioDonacion.update = (voluntariodonacion) => {
    const sql = `
        UPDATE
            voluntariodonacion
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
        voluntariodonacion.id,
        voluntariodonacion.idDonante,
        voluntariodonacion.estado,
        voluntariodonacion.lat,
        voluntariodonacion.lng,
        voluntariodonacion.fechaRecoger
    ]);

}
VoluntarioDonacion.remove = (id) => {
    const sql = `
        DELETE FROM voluntariodonacion
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = VoluntarioDonacion;