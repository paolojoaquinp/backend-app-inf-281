const db = require('../config/config');

const VoluntarioSolicitud = {}

VoluntarioSolicitud.getAllById = (idVoluntario) => {
    const sql = `
    SELECT
        *
    FROM
        voluntariosolicitud
    WHERE
        idVoluntario = $1
    `;

    return db.manyOrNone(sql,idVoluntario);
}

VoluntarioSolicitud.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        voluntariosolicitud 
    `;

    return db.manyOrNone(sql);
}

VoluntarioSolicitud.getById = (idVoluntario) => {
    const sql = `
    SELECT
        vd.id,
        vd.idSolicitud,
        vd.idVoluntario,
        vd.estado,
        d.fecharecoger,
        don.id as donante_id,
        don.idUser as donante_user_id,
        u.nombre as autor_name,
        u.paterno as autor_paterno,
        u.materno as autor_materno
    FROM 
        voluntariosolicitud as vd
    INNER JOIN solicitud as d ON vd.idSolicitud = d.id
    INNER JOIN beneficiarios as don ON d.idBeneficiario = don.idUser
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

VoluntarioSolicitud.getOneById = (idVoluntario) => {
    const sql = `
    SELECT
       *
    FROM 
        voluntariosolicitud
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

VoluntarioSolicitud.getByUserId = (idDonante) => {
    const sql = `
    SELECT
        *
    FROM 
        voluntariosolicitud 
    WHERE
        idDonante = $1
    GROUP BY
        id
    `;

    return db.manyOrNone(sql, idDonante);
}

VoluntarioSolicitud.create = (voluntariosolicitud) => {
    const sql = `
        INSERT INTO voluntariosolicitud (
            idsolicitud,
            idvoluntario,
            estado
        )
        VALUES($1, $2, $3) RETURNING id
    `;
    return db.oneOrNone(sql,[
        voluntariosolicitud.idSolicitud,
        voluntariosolicitud.idVoluntario,
        voluntariosolicitud.estado
    ]);
}

VoluntarioSolicitud.update = (voluntariosolicitud) => {
    const sql = `
        UPDATE
            voluntariosolicitud
        SET
            idSolicitud = $2, 
            idVoluntario = $3,
            estado = $4
        WHERE
            id = $1
    `;
    return db.none(sql,[
        voluntariosolicitud.id,
        voluntariosolicitud.idSolicitud,
        voluntariosolicitud.idVoluntario,
        voluntariosolicitud.estado
    ]);

}
VoluntarioSolicitud.remove = (id) => {
    const sql = `
        DELETE FROM voluntariosolicitud
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = VoluntarioSolicitud;