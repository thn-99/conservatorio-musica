CREATE TABLE admins(
    id int(3) primary key AUTO_INCREMENT,
    nombre varchar(45) NOT NULL,
    apellidos varchar(45) NOT NULL,
    hashClave varchar(65) not null
);

CREATE TABLE alumnos(
    id int(4) primary key AUTO_INCREMENT,
    nombre varchar(45),
    apellidos varchar(45),
    instrumento varchar(30) not null,
    correo varchar(254) not null unique,
    hashClave varchar(65) not null
);

CREATE TABLE peticiones(
    id int(7) primary key AUTO_INCREMENT,
    nombre varchar(45) not null,
    apellidos varchar(45) not null,
    instrumento varchar(30) not null,
    correo varchar(254) not null,
    hashClave varchar(65) not null
);

CREATE TABLE registroPeticiones(
    id int(6) primary key AUTO_INCREMENT,
    nombre varchar(45) not null,
    apellidos varchar(45) not null,
    instrumento varchar(30) not null,
    correo varchar(254) not null,
    hashClave varchar(65) not null,
    idAdmin int(3) not null,
    FOREIGN KEY(idAdmin) REFERENCES admins(id)
);

create table cabinas(
    id int(4) primary key AUTO_INCREMENT,
    planta int(3) not null,
    tipo varchar(15) not null
);

INSERT INTO cabinas(planta,tipo) VALUES
(1,'general'),
(1,'general'),
(1,'general'),
(1,'general'),
(1,'general'),
(1,'general'),
(1,'general'),
(1,'arpa'),
(1,'canto'),
(1,'precusion'),
(1,'precusion'),
(1,'jazz'),
(1,'camara'),
(2,'general'),
(2,'general'),
(2,'general'),
(2,'general'),
(2,'general'),
(2,'general'),
(2,'general'),
(2,'general'),
(3,'general'),
(3,'general'),
(3,'general'),
(3,'general'),
(3,'general'),
(3,'general'),
(3,'general'),
(3,'general'),
(3,'general'),
(3,'general');

CREATE TABLE reservas(
    id int(7) primary key,
    idAlumno int(4) not null,
    idCabina int(4) not null,
    fecha date not null,
    hora time not null,
    FOREIGN KEY(idAlumno) REFERENCES alumnos(id),
    FOREIGN KEY(idCabina) REFERENCES cabinas(id)
);

CREATE TABLE reservasCamara(
    id int(7) primary key,
    idAlumnoReserva int(4) not null,
    idAlumno1 int(4) not null,
    idAlumno2 int(4) not null,
    idCabina int(4) not null,
    fecha date not null,
    hora time not null,
    FOREIGN KEY(idAlumnoReserva) REFERENCES alumnos(id),
    FOREIGN KEY(idAlumno1) REFERENCES alumnos(id),
    FOREIGN KEY(idAlumno2) REFERENCES alumnos(id),
    FOREIGN KEY(idCabina) REFERENCES cabinas(id)
);