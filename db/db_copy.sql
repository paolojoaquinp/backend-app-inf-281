base de datos

CREATE DATABASE ProyectoINF281;

USE ProyectoINF281;

DROP TABLE IF EXISTS Usuarios;
CREATE TABLE Usuarios(
    id BIGSERIAL PRIMARY KEY,
    nombre varchar(64),
    paterno varchar(64),
    materno varchar(64),
    direccion varchar(64),
    telefono varchar(12),
    estado boolean,
    email varchar(64),
    password varchar(64),
    createdAt TIMESTAMP(0) NOT NULL
);

 INSERT INTO usuarios(
            nombre,
            paterno,
            materno,
            direccion,
            telefono,
            estado,
            email,
            password,
            createdAt
        ) VALUES (
            'nametest',
            'paternotest',
            'maternotest',
            'direccion calle #000',
            '1234567',
            false,
            'prueba@prueba.com',
            '123456',
            '20240325 10:34:09 AM'
        );

DROP TABLE IF EXISTS Administradores;
CREATE TABLE Administradores(
    id BIGSERIAL PRIMARY KEY,
    idUser integer not null,
    FOREIGN KEY (idUser) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE
);
INSERT INTO administradores (idUser) VALUES (1);
DROP TABLE IF EXISTS Normas;
CREATE TABLE Normas(
    id BIGSERIAL PRIMARY KEY,
    id_admin BIGINT,
    titulo varchar(64),
    descripcion varchar(255),
    createdAt TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_admin) REFERENCES administradores(id) ON UPDATE CASCADE ON DELETE CASCADE
);


DROP TABLE IF EXISTS Educacion;
CREATE TABLE Educacion(
    id BIGSERIAL PRIMARY KEY,
    id_admin BIGINT,
    titulo varchar(64),
    descripcion varchar(255),
    imagen varchar(255),
    createdAt TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_admin) REFERENCES administradores(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS Eventos;
CREATE TABLE Eventos(
    id BIGSERIAL PRIMARY KEY,
    id_admin BIGINT,
    titulo varchar(64), 
    descripcion varchar(255),
    imagen varchar(255),
    fecha TIMESTAMP(0) NOT NULL,
    createdAt TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_admin) REFERENCES administradores(id) ON UPDATE CASCADE ON DELETE CASCADE
);

------------------------------- task 02 abril

DROP TABLE IF EXISTS Voluntarios;
CREATE TABLE Voluntarios(
    id BIGSERIAL PRIMARY KEY,
    idUser integer not null,
    FOREIGN KEY (idUser) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS Donantes;
CREATE TABLE Donantes(
    id BIGSERIAL PRIMARY KEY,
    idUser integer not null,
    ubicacion varchar(64),
    tipo varchar(20),
    createdAt TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (idUser) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS Beneficiarios;
CREATE TABLE Beneficiarios(
    id BIGSERIAL PRIMARY KEY,
    idUser integer not null,
    FOREIGN KEY (idUser) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE
);

----------------------------------

DROP TABLE IF EXISTS Notificaciones;
CREATE TABLE Notificaciones (
    id BIGSERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    message TEXT,
    createdAt TIMESTAMP(0) NOT NULL,
    isRead BOOLEAN,
    FOREIGN KEY (sender_id) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Usuarios(id) ON UPDATE CASCADE ON DELETE CASCADE
);
ALTER TABLE notificaciones
ADD COLUMN tipo TYPE varchar(50);

INSERT INTO notificaciones(
            sender_id,
            receiver_id,
            message,
            createdat,
            isread
        ) VALUES (
            4,
            1,
            'notificaciontest',
            '20240325 10:34:09 AM',
			false
        );

INSERT INTO NOTIFICACIONES (
	sender_id,
	receiver_id,
	message,
	createdat,
	isread
) VALUES 
(
	4,
	25,
	'necesito',
	'20240325 10:34:09 AM',
	false
);

/* --------------------------- */

DROP TABLE IF EXISTS Donacion;
CREATE TABLE Donacion(
    id BIGSERIAL PRIMARY KEY,
    idDonante integer not null, /* idUser */
    estado varchar(10),
    lat integer,
    lng integer,
    fechaRecoger TIMESTAMP(0) NOT NULL,
    fechaEntregar TIMESTAMP(0) NOT NULL,
    createdAt TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (idDonante) REFERENCES Donantes(idUser) ON UPDATE CASCADE ON DELETE CASCADE
);


ALTER TABLE Donantes
ADD CONSTRAINT unique_idUser UNIQUE (idUser);

ALTER TABLE Donacion
ADD CONSTRAINT donacion_iddonante_fkey FOREIGN KEY (idDonante) REFERENCES Donantes(idUser);


CREATE TABLE VoluntariosDonacion (
    id BIGSERIAL PRIMARY KEY,
    idDonacion integer not null,
    idVoluntario integer not null,
    estado varchar(10),
    FOREIGN KEY (idDonacion) REFERENCES Donacion(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idVoluntario) REFERENCES Voluntarios(idUser) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE VoluntarioSolicitud (
    id BIGSERIAL PRIMARY KEY,
    idSolicitud integer not null,
    idVoluntario integer not null,
    estado varchar(10),
    FOREIGN KEY (idSolicitud) REFERENCES Solicitud(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idVoluntario) REFERENCES Voluntarios(idUser) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO voluntariosdonacion(
            idDonacion,
            idVoluntario,
            estado
        ) VALUES (
            1,
            1,
            'pendiente'
        );

ALTER TABLE Voluntarios
ADD CONSTRAINT unique_idUser UNIQUE (idUser);


ALTER TABLE Beneficiarios
ADD CONSTRAINT beneficiarios_unique_idUser UNIQUE (idUser);

CREATE TABLE Inventario(
    id BIGSERIAL PRIMARY KEY,
    idDonacion integer not null,
    estado varchar(10),
    createdAt TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (idDonacion) REFERENCES Donacion(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Producto(
    id BIGSERIAL PRIMARY KEY,
    idInventario integer not null,
    nombre varchar(64),
    descripcion varchar(255),
    cantidad integer,
    createdAt TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (idInventario) REFERENCES Inventario(id) ON UPDATE CASCADE ON DELETE CASCADE
);

/* -------------------------- */
DROP TABLE IF EXISTS SolicitudProducto;
DROP TABLE IF EXISTS Solicitud;

CREATE TABLE Solicitud(
    id BIGSERIAL PRIMARY KEY,
    idBeneficiario integer not null,
    descripcion varchar(255),
    estado varchar(10),
    fecharecoger TIMESTAMP(0) NOT NULL,
    FOREIGN KEY (idBeneficiario) REFERENCES Beneficiarios(idUser) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE SolicitudProducto(
    id BIGSERIAL PRIMARY KEY,
    idSolicitud integer not null,
    nombre varchar(64),
    cantidad integer,
    FOREIGN KEY (idSolicitud) REFERENCES Solicitud(id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO Solicitud(
            idBeneficiario,
            descripcion,
            estado,
            fecharecoger
        ) VALUES (
            25,
            'descripcion de solicitud',
            'inicial',
            '20240325 10:34:09 AM'
        );

CREATE TABLE Organizacion(
    id integer primary key not null auto increment,
    idBenefRepresentante integer not null,
    nombre varchar(64),
    tipo varchar(64),
    createdAt datetime
);

CREATE TABLE Alimento(
    id integer primary key not null auto increment,
    idInventario integer not null,
    nombre varchar(64),
    descripcion varchar(255),
    fechaVencimiento datetime,
    cantidad integer,
    createdAt datetime,
    FOREIGN KEY (idInventario) REFERENCES Inventario(id),
);



/* TRIGGERS */

/*  */
CREATE OR REPLACE FUNCTION after_donation_insert() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO Inventario (idDonacion, estado, createdAt)
    VALUES (NEW.id, 'activo', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER after_donation_insert
AFTER INSERT ON Donacion
FOR EACH ROW
EXECUTE PROCEDURE after_donation_insert();




/* IF */
DROP FUNCTION IF EXISTS after_donation_update() CASCADE;

CREATE OR REPLACE FUNCTION after_donation_update() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estado = 'inactivo' AND OLD.estado = 'finalizado' THEN
        UPDATE Inventario
        SET estado = 'inactivo'
        WHERE idDonacion = NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_donation_update
AFTER UPDATE ON Donacion
FOR EACH ROW
EXECUTE PROCEDURE after_donation_update();




/* verify activate */
DROP FUNCTION IF EXISTS update_inventario_status() CASCADE;

CREATE OR REPLACE FUNCTION update_inventario_status() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.estado = 'finalizado' THEN
        UPDATE Inventario
        SET estado = 'activo'
        WHERE idDonacion = NEW.id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_inventario_status
AFTER UPDATE ON Donacion
FOR EACH ROW
WHEN (OLD.estado IS DISTINCT FROM NEW.estado)
EXECUTE PROCEDURE update_inventario_status();

-- query: Obtener todos los productos de la tabla productos de inventarios activos. Obtener la suma total de cada producto (agrupar por nombre)
SELECT nombre, SUM(cantidad) as total
FROM producto
JOIN inventario ON producto.idinventario = inventario.id
WHERE inventario.estado = 'activo'
GROUP BY nombre;
    


/* Actualizar estado de donacion basado en voluntarios */
CREATE OR REPLACE FUNCTION update_donacion_status() RETURNS TRIGGER AS $$
DECLARE
    total INTEGER;
    aceptados INTEGER;
BEGIN
    SELECT COUNT(*), COUNT(*) FILTER (WHERE estado = 'aceptado') INTO total, aceptados
    FROM VoluntariosDonacion
    WHERE idDonacion = NEW.idDonacion;

    IF total = aceptados THEN
        UPDATE Donacion
        SET estado = 'aceptado'
        WHERE id = NEW.idDonacion;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_donacion_status
AFTER INSERT OR UPDATE ON VoluntariosDonacion
FOR EACH ROW
EXECUTE PROCEDURE update_donacion_status();


-- ACTUALIZAR ESTADO DE SOLICITUD BASADO EN VOLUNTARIOS
CREATE OR REPLACE FUNCTION update_solicitud_status() RETURNS TRIGGER AS $$
DECLARE
    total INTEGER;
    aceptados INTEGER;
BEGIN
    SELECT COUNT(*), COUNT(*) FILTER (WHERE estado = 'aceptado') INTO total, aceptados
    FROM VoluntarioSolicitud
    WHERE idSolicitud = NEW.idSolicitud;

    IF total = aceptados THEN
        UPDATE Solicitud
        SET estado = 'aceptado'
        WHERE id = NEW.idSolicitud;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_solicitud_status
AFTER INSERT OR UPDATE ON VoluntarioSolicitud
FOR EACH ROW
EXECUTE PROCEDURE update_solicitud_status();
