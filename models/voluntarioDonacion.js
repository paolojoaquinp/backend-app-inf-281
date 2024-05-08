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

VoluntarioDonacion.getById = (idVoluntario) => {
    const sql = `
    SELECT
        vd.id,
        vd.idDonacion,
        vd.idVoluntario,
        vd.estado,
        d.fechaentregar,
        don.id as donante_id,
        don.idUser as donante_user_id,
        u.nombre as autor_name,
        u.paterno as autor_paterno,
        u.materno as autor_materno
    FROM 
        voluntariosdonacion as vd
    INNER JOIN donacion as d ON vd.idDonacion = d.id
    INNER JOIN donantes as don ON d.idDonante = don.idUser
    INNER JOIN usuarios as u ON don.idUser = u.id
    WHERE
        vd.idVoluntario = $1 or don.idUser = $1
    `;

    return db.manyOrNone(sql, idVoluntario)
        /* .then(result => {
            if (result) {
                return result.id;
            } else {
                return null;
            }
        }); */
}

VoluntarioDonacion.getOneById = (idVoluntario) => {
    const sql = `
    SELECT
       *
    FROM 
        voluntariosdonacion
    WHERE
        idVoluntario = $1;
    `;
    return db.oneOrNone(sql, idVoluntario)
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
        voluntariodonacion.estado
    ]);
}

VoluntarioDonacion.update = (voluntariodonacion) => {
    const sql = `
        UPDATE
            voluntariosdonacion
        SET
            idDonacion = $2, 
            idVoluntario = $3,
            estado = $4
        WHERE
            id = $1
    `;
    return db.none(sql,[
        voluntariodonacion.id,
        voluntariodonacion.idDonacion,
        voluntariodonacion.idVoluntario,
        voluntariodonacion.estado
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