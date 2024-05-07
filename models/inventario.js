const db = require('../config/config');

const Inventario = {}

Inventario.getAllById = (idDonacion) => {
    const sql = `
    SELECT
        *
    FROM
        inventario
    WHERE
        idDonacion = $1
    `;

    return db.manyOrNone(sql,idDonacion);
}

Inventario.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        inventario 
    ORDER BY id ASC
    `;

    return db.manyOrNone(sql);
}

Inventario.getById = (idDonacion) => {
    const sql = `
    SELECT
        id,
        idDonacion,
        estado,
        createdAt
    FROM 
        inventario 
    WHERE
        idDonacion = $1
    `;

    return db.oneOrNone(sql, idDonacion)
        .then(result => {
            if (result) {
                return result.id;
            } else {
                return null;
            }
        });
}

Inventario.create = (inventario) => {
    const sql = `
        INSERT INTO inventario (
            idDonacion,
            estado,
            createdAt
        )
        VALUES($1, $2, $3) RETURNING id
    `;
    return db.oneOrNone(sql,[
        inventario.idDonacion,
        inventario.estado,
        new Date()
    ]);
}

Inventario.update = (inventario) => {
    const sql = `
        UPDATE
            inventario
        SET
            idDonacion = $2,
            estado = $3
        WHERE
            id = $1
    `;
    return db.none(sql,[
        inventario.id,
        inventario.idDonacion,
        inventario.estado
    ]);

}
Inventario.remove = (id) => {
    const sql = `
        DELETE FROM inventario
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = Inventario;