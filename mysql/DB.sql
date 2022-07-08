-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 08-07-2022 a las 18:44:20
-- Versión del servidor: 5.7.33
-- Versión de PHP: 7.4.19

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lovenest`
--
CREATE DATABASE IF NOT EXISTS `lovenest` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `lovenest`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `supermarket`
--

CREATE TABLE `supermarket` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `producto` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `precio` int(30) NOT NULL,
  `cantidad` int(30) NOT NULL,
  `observacion` varchar(100) NOT NULL,
  `foto` varchar(60) NOT NULL,
  `usuarioId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `supermarket`:
--   `usuarioId`
--       `users` -> `id`
--

--
-- Volcado de datos para la tabla `supermarket`
--

INSERT INTO `supermarket` (`id`, `fecha`, `producto`, `marca`, `precio`, `cantidad`, `observacion`, `foto`, `usuarioId`) VALUES
(1, '2022-07-08', 'arroz', 'mary', 100, 1, 'primer producto', '', 44),
(2, '2022-07-08', 'Jugo', 'Frika', 120, 4, 'Sabor Durazno', '', 44),
(3, '2022-07-08', 'Leche', 'Las 3 niÃ±as', 120, 8, 'Descremada', '', 44),
(4, '2022-07-08', 'Yogurt', 'La Serenisima', 100, 8, 'Frutilla', '', 44);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `usuario` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `token` varchar(80) NOT NULL,
  `confirmado` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- RELACIONES PARA LA TABLA `users`:
--

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellido`, `usuario`, `password`, `email`, `token`, `confirmado`) VALUES
(44, ' alfredo', 'Guardia', 'prueba', '$2y$10$SQBokO9.1OEbZDkSJL//g.pWrvfHMtxfDxZa1Zq9eVGisONLqv7uO', 'alfguardia@hotmail.com', '', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `supermarket`
--
ALTER TABLE `supermarket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioId` (`usuarioId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `supermarket`
--
ALTER TABLE `supermarket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `supermarket`
--
ALTER TABLE `supermarket`
  ADD CONSTRAINT `supermarket_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
