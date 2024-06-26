const db = require('../config/config');

const Donante = {}

Donante.getAllById = (userId) => {
    const sql = `
    SELECT
        *
    FROM
        donantes
    WHERE
        id_admin = $1
    `;

    return db.manyOrNone(sql,userId);
}

Donante.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        donantes as d
    INNER JOIN usuarios ON d.idUser = usuarios.id
    ORDER BY d.id ASC
    `;

    return db.manyOrNone(sql);
}

Donante.getById = (idUser) => {
    const sql = `
    SELECT
        id,
        idUser,
        ubicacion,
        tipo,
        createdAt
    FROM 
        donantes 
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

Donante.getByUserId = (idUser) => {
    const sql = `
    SELECT
        id,
        idUser,
        ubicacion,
        tipo,
        createdAt
    FROM 
        donantes 
    WHERE
        idUser = $1
    GROUP BY
        id
    `;

    return db.manyOrNone(sql, idUser);
}

Donante.create = (donantes) => {
    const sql = `
        INSERT INTO donantes (
            idUser,
            ubicacion,
            tipo,
            createdAt
        )
        VALUES($1, $2, $3, $4) RETURNING id
    `;
    return db.oneOrNone(sql,[
        donantes.idUser,
        donantes.ubicacion,
        donantes.tipo,
        new Date()
    ])
}

Donante.update = (donantes) => {
    const sql = `
        UPDATE
            donantes
        SET
            idUser = $2,
            ubicacion = $3,
            tipo = $4
        WHERE
            id = $1
    `;
    return db.none(sql,[
        donantes.id,
        donantes.idUser,
        donantes.ubicacion,
        donantes.tipo
    ]);

}
Donante.remove = (id) => {
    const sql = `
        DELETE FROM donantes
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = Donante;