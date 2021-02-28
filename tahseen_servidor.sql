-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-02-2021 a las 21:09:20
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tahseen_servidor`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `hashClave` varchar(65) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`nombre`, `hashClave`) VALUES
('tahseen', '$2y$14$Xszw1gfvB3OklstDJOk6TOYwBS82i4YHZY7vRXe/8gF87Yr9fqerG');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `apellidos` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `instrumento` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `correo` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `hashClave` varchar(65) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`id`, `nombre`, `apellidos`, `instrumento`, `correo`, `hashClave`) VALUES
(1, 'tahseen', 'ahmad', 'piano', 'tahseen@gmail.com', '$2y$14$p0FHo7.Z0XGH/uJl0YaFtOhk62C1iByRNPFd9hG4.8.rcfNxhCYXO'),
(3, 'pascual', 'vicente', 'saxofón', 'pascual@correo.com', '$2y$14$p0FHo7.Z0XGH/uJl0YaFtOhk62C1iByRNPFd9hG4.8.rcfNxhCYXO'),
(5, 'alvaro', 'devis', 'bombo', 'alvaro@correo.com', '$2y$14$80Vg7.x3R7joGkziX8yJk.34ao5ePBjLTeAQLbdcveqCXEafeo7dK');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cabinas`
--

CREATE TABLE `cabinas` (
  `id` int(11) NOT NULL,
  `planta` int(11) NOT NULL,
  `tipo` varchar(15) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `cabinas`
--

INSERT INTO `cabinas` (`id`, `planta`, `tipo`) VALUES
(1, 1, 'general'),
(2, 1, 'general'),
(3, 1, 'general'),
(4, 1, 'general'),
(5, 1, 'general'),
(6, 1, 'general'),
(7, 1, 'general'),
(8, 1, 'arpa'),
(9, 1, 'canto'),
(10, 1, 'precusion'),
(11, 1, 'precusion'),
(12, 1, 'jazz'),
(13, 1, 'camara'),
(14, 2, 'general'),
(15, 2, 'general'),
(16, 2, 'general'),
(17, 2, 'general'),
(18, 2, 'general'),
(19, 2, 'general'),
(20, 2, 'general'),
(21, 2, 'general'),
(22, 3, 'general'),
(23, 3, 'general'),
(24, 3, 'general'),
(25, 3, 'general'),
(26, 3, 'general'),
(27, 3, 'general'),
(28, 3, 'general'),
(29, 3, 'general'),
(30, 3, 'general'),
(31, 3, 'general');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plantas`
--

CREATE TABLE `plantas` (
  `id` int(11) NOT NULL,
  `horas` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `plantas`
--

INSERT INTO `plantas` (`id`, `horas`) VALUES
(1, '08:30:00'),
(1, '10:00:00'),
(1, '11:30:00'),
(1, '13:00:00'),
(1, '14:30:00'),
(1, '16:00:00'),
(1, '17:30:00'),
(1, '19:00:00'),
(1, '20:30:00'),
(2, '08:15:00'),
(2, '09:45:00'),
(2, '11:15:00'),
(2, '12:45:00'),
(2, '14:15:00'),
(2, '15:45:00'),
(2, '17:15:00'),
(2, '18:45:00'),
(2, '20:15:00'),
(3, '08:00:00'),
(3, '09:30:00'),
(3, '11:00:00'),
(3, '12:30:00'),
(3, '14:00:00'),
(3, '15:30:00'),
(3, '17:00:00'),
(3, '18:30:00'),
(3, '20:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservacamara`
--

CREATE TABLE `reservacamara` (
  `id` int(11) NOT NULL,
  `alumno2` int(11) DEFAULT NULL,
  `alumno3` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `idAlumno` int(11) DEFAULT NULL,
  `idCabina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `reservacamara`
--

INSERT INTO `reservacamara` (`id`, `alumno2`, `alumno3`, `fecha`, `hora`, `idAlumno`, `idCabina`) VALUES
(3, 3, 5, '2021-03-03', '08:30:00', 1, 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `idAlumno` int(11) DEFAULT NULL,
  `idCabina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `fecha`, `hora`, `idAlumno`, `idCabina`) VALUES
(1, '2021-02-24', '08:30:00', 1, 1),
(2, '2021-02-24', '10:00:00', 1, 1),
(8, '2021-02-27', '08:30:00', 1, 1),
(9, '2021-02-27', '08:30:00', 1, 8),
(10, '2021-02-27', '11:30:00', 1, 8),
(13, '2021-02-27', '16:00:00', 1, 1),
(14, '2021-02-27', '17:30:00', 1, 1),
(15, '2021-02-27', '20:30:00', 1, 1),
(25, '2021-02-28', '11:30:00', 1, 1),
(27, '2021-02-28', '13:00:00', 1, 1),
(35, '2021-03-02', '13:00:00', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`nombre`);

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `cabinas`
--
ALTER TABLE `cabinas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `planta` (`planta`);

--
-- Indices de la tabla `plantas`
--
ALTER TABLE `plantas`
  ADD PRIMARY KEY (`id`,`horas`);

--
-- Indices de la tabla `reservacamara`
--
ALTER TABLE `reservacamara`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_26F3B9CA5F1ED7AD` (`alumno2`),
  ADD KEY `IDX_26F3B9CA2819E73B` (`alumno3`),
  ADD KEY `idCabina` (`idCabina`),
  ADD KEY `idAlumno` (`idAlumno`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCabina` (`idCabina`),
  ADD KEY `idAlumno` (`idAlumno`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `cabinas`
--
ALTER TABLE `cabinas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `reservacamara`
--
ALTER TABLE `reservacamara`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservacamara`
--
ALTER TABLE `reservacamara`
  ADD CONSTRAINT `FK_26F3B9CA2819E73B` FOREIGN KEY (`alumno3`) REFERENCES `alumnos` (`id`),
  ADD CONSTRAINT `FK_26F3B9CA5F1ED7AD` FOREIGN KEY (`alumno2`) REFERENCES `alumnos` (`id`),
  ADD CONSTRAINT `FK_26F3B9CA77247DB7` FOREIGN KEY (`idAlumno`) REFERENCES `alumnos` (`id`),
  ADD CONSTRAINT `FK_26F3B9CAEF03F2F0` FOREIGN KEY (`idCabina`) REFERENCES `cabinas` (`id`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `FK_AA1DAB0177247DB7` FOREIGN KEY (`idAlumno`) REFERENCES `alumnos` (`id`),
  ADD CONSTRAINT `FK_AA1DAB01EF03F2F0` FOREIGN KEY (`idCabina`) REFERENCES `cabinas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
