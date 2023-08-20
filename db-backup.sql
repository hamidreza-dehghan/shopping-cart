-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 20, 2023 at 10:26 AM
-- Server version: 5.7.31
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping_cart`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Phone', '2023-08-18 20:55:43', '2023-08-18 20:55:43'),
(2, 'Laptop', '2023-08-19 13:53:56', '2023-08-19 13:53:56'),
(3, 'Camera', '2023-08-19 19:37:00', '2023-08-19 19:37:00');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(1, 'Samsung', 1200, 1, '2023-08-20 10:20:20', '2023-08-20 10:20:20'),
(2, 'iPhone', 1400, 1, '2023-08-20 10:20:28', '2023-08-20 10:20:28'),
(3, 'Asus', 2000, 2, '2023-08-20 10:21:50', '2023-08-20 10:21:50'),
(4, 'DELL', 1900, 2, '2023-08-20 10:22:16', '2023-08-20 10:22:16'),
(6, 'Canon', 3000, 3, '2023-08-20 10:22:38', '2023-08-20 10:22:38'),
(7, 'Sony', 2500, 3, '2023-08-20 10:23:06', '2023-08-20 10:23:06'),
(8, 'Lenovo', 1300, 2, '2023-08-20 10:23:47', '2023-08-20 10:23:47');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `email`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', '$2b$10$qXXv1lTAbMXZmB86HusiM.mH4gJ5UNliyHa1qMZEckdVuZ/uukqh6', 'develop.ir@gmail.com', 1, '2023-08-20 10:19:13', '2023-08-20 10:19:13'),
(2, 'Customer', '$2b$10$kkQGKgzGDsqu9DkWADFhKOuAvZ0tmKhuNvT.QCXYqq7SewvY1c8V.', 'customer@gmail.com', 0, '2023-08-20 10:24:22', '2023-08-20 10:24:22');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
