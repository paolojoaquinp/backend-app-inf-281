const db = require('../config/config');

const Producto = {}

Producto.getAllById = (idInventario) => {
    const sql = `
    SELECT
        *
    FROM
        producto
    WHERE
        idInventario = $1
    `;

    return db.manyOrNone(sql,idInventario);
}

Producto.getAll = () => {
    const sql = `
    SELECT
        *
    FROM
        producto p
    INNER JOIN inventario in ON p.idInventario = in.id
    INNER JOIN donacion  do ON in.idDonacion = do.id
    ORDER BY p.id ASC
    `;

    return db.manyOrNone(sql);
}

Producto.getById = (idUser) => {
    const sql = `
    SELECT
        id,
        idUser,
        ubicacion,
        tipo,
        createdAt
    FROM 
        producto 
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

Producto.getByUserId = (idInventario) => {
    const sql = `
    SELECT
        *
    FROM 
        producto 
    WHERE
        idInventario = $1
    GROUP BY
        id
    `;

    return db.manyOrNone(sql, idInventario);
}

Producto.create = (producto) => {
    const sql = `
        INSERT INTO producto (
            idInventario,
            nombre,
            descripcion,
            cantidad,
            createdAt
        )
        VALUES($1, $2, $3, $4, $5) RETURNING id
    `;
    return db.oneOrNone(sql,[
        producto.idInventario,
        producto.nombre,
        producto.descripcion,
        producto.cantidad,
        new Date()
    ]);
}

Producto.update = (producto) => {
    const sql = `
        UPDATE
            producto
        SET
            idInventario = $2,
            nombre = $3,
            descripcion = $4,
            cantidad = $5,
        WHERE
            id = $1
    `;
    return db.none(sql,[
        producto.id,
        producto.idInventario,
        producto.nombre,
        producto.descripcion,
        producto.cantidad
    ]);

}
Producto.remove = (id) => {
    const sql = `
        DELETE FROM producto
        WHERE id = $1;
    `;
    return db.none(sql,[
        id
    ]);
}



module.exports = Producto;