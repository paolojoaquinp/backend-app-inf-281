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
            'test@prueba.com',
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

-------------------------------


DROP TABLE IF EXISTS tasks Donante;
CREATE TABLE Donante(
    id integer primary key not null auto increment,
    idUser integer not null,
    ubicacion varchar(64),
    tipo varchar(20),
    createdAt DATETIME,
    FOREIGN KEY (idUser) REFERENCES Usuarios(id)
);

CREATE TABLE Voluntario(
    id integer primary key not null auto increment,
    idUser integer not null,
    FOREIGN KEY (idUser) REFERENCES Usuarios(id)
);
CREATE TABLE Benefiario(
    id integer primary key not null auto increment,
    idUser integer not null,
    FOREIGN KEY (idUser) REFERENCES Usuarios(id)
);


CREATE TABLE Donacion(
    id integer primary key not null auto increment,
    idDonante integer not null,
    idVoluntario integer not null,
    estado varchar(10),
    fechaRecoger datetime,
    fechaEntregar datetime,
    createdAt datetime,
    FOREIGN KEY (idDonante) REFERENCES Donante(id),
    FOREIGN KEY (idVoluntario) REFERENCES Voluntario(id)
);

CREATE TABLE Solicitud(
    id integer primary key not null auto increment,
    idBeneficiario integer not null,
    descripcion varchar(255),
    idInventario integer not null,
    idAdminRevisor integer not null,
    FOREIGN KEY (idBeneficiario) REFERENCES Benefiario(id),
    FOREIGN KEY (idInventario) REFERENCES Inventario(id),
);

CREATE TABLE Organizacion(
    id integer primary key not null auto increment,
    idBenefRepresentante integer not null,
    nombre varchar(64),
    tipo varchar(64),
    createdAt datetime
);

CREATE TABLE Inventario(
    id integer primary key not null auto increment,
    idDonacion integer not null,
    estado varchar(10),
    createdAt datetime,
    FOREIGN KEY (idDonacion) REFERENCES Donacion(id),
);

CREATE TABLE Producto(
    id integer primary key not null auto increment,
    idInventario integer not null,
    nombre varchar(64),
    descripcion varchar(255),
    cantidad integer,
    createdAt datetime
    FOREIGN KEY (idInventario) REFERENCES Inventario(id),
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

