-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2026 at 04:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `isbn` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `publishing_date` date NOT NULL,
  `writer` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn` (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `isbn`, `title`, `publishing_date`, `writer`) VALUES
(1, '9789510000001', 'The Kalevala Retold', '2018-09-07', 'Elias Lönnroth'),
(2, '9789510000002', 'Winter in Helsinki', '1994-12-30', 'Sofia Oksanen'),
(3, '9789510000003', 'The Silent Forest', '1991-02-14', 'Arto Paasilinna'),
(4, '9789510000004', 'Northern Lights Diary', '2023-04-07', 'Tove Jansson'),
(5, '9789510000005', 'The Last Sauna', '2002-05-04', 'Mika Waltari'),
(6, '9789510000006', 'Archipelago Summer', '2000-12-26', 'Kari Hotakainen'),
(7, '9789510000007', 'Snowfall Over Turku', '2000-01-06', 'Leena Lehtolainen'),
(8, '9789510000008', 'The Ice Bridge', '1996-04-05', 'Johanna Sinisalo'),
(9, '9789510000009', 'Lakes and Legends', '2023-01-14', 'Väinö Linna'),
(10, '9789510000010', 'Midnight Sun Rising', '1994-08-07', 'Rosa Liksom'),
(11, '9789510000011', 'The Reindeer Path', '2020-05-10', 'Antti Tuuri'),
(12, '9789510000012', 'Birch Tree Whispers', '2023-03-24', 'Sofi Vikman'),
(13, '9789510000013', 'The Fjord Traveler', '2014-06-19', 'Katja Kettu'),
(14, '9789510000014', 'Stories from Lapland', '1993-11-25', 'Timo K. Mukka'),
(15, '9789510000015', 'The Glass Harbor', '2016-06-27', 'Riikka Pulkkinen'),
(16, '9789510000016', 'Aurora\'s Secret', '2008-12-04', 'Pajtim Statovci'),
(17, '9789510000017', 'The Long Winter Road', '1991-06-05', 'Aki Ollikainen'),
(18, '9789510000018', 'Cabin by the Lake', '1991-05-04', 'Miika Nousiainen'),
(19, '9789510000019', 'The Runic Code', '1994-03-16', 'Maria Peura'),
(20, '9789510000020', 'Frozen Archipelago', '1999-10-23', 'Hannu Mäkelä'),
(21, '9789510000021', 'The Northern Star', '2000-06-08', 'Jari Tervo'),
(22, '9789510000022', 'Whispers of Suomi', '2012-09-01', 'Anja Snellman'),
(23, '9789510000023', 'The Rowan Tree House', '2017-01-02', 'Laila Hirvisaari'),
(24, '9789510000024', 'Ice Fishing Tales', '1991-03-11', 'Juha Itkonen'),
(25, '9789510000025', 'The Sami Drum', '2015-03-06', 'Kerttu Vuolab'),
(26, '9789510000026', 'River of Ash', '1998-12-02', 'Emmi Itäranta'),
(27, '9789510000027', 'The Marsh Light', '2022-02-13', 'Selja Ahava'),
(28, '9789510000028', 'Beyond the Fells', '2019-02-25', 'Heidi Köngäs'),
(29, '9789510000029', 'The Quiet Harbor Town', '2021-06-17', 'Marko Kilpi'),
(30, '9789510000030', 'Songs of the Tundra', '2014-06-12', 'Outi Pakkanen');

-- --------------------------------------------------------

--
-- Table structure for table `book_copies`
--

CREATE TABLE IF NOT EXISTS `book_copies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `borrowed` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `book_copies`
--

INSERT INTO `book_copies` (`id`, `book_id`, `borrowed`) VALUES
(1, 1, 0),
(2, 2, 0),
(3, 3, 0),
(4, 4, 0),
(5, 5, 0),
(6, 6, 1),
(7, 7, 0),
(8, 8, 0),
(9, 9, 0),
(10, 10, 0),
(11, 11, 0),
(12, 12, 0),
(13, 13, 0),
(14, 14, 0),
(15, 15, 1),
(16, 16, 0),
(17, 17, 0),
(18, 18, 1),
(19, 19, 0),
(20, 20, 0),
(21, 21, 1),
(22, 22, 1),
(23, 23, 0),
(24, 24, 0),
(25, 25, 0),
(26, 26, 1),
(27, 27, 1),
(28, 28, 1),
(29, 29, 0),
(30, 30, 0);

-- --------------------------------------------------------

--
-- Table structure for table `borrowings`
--

CREATE TABLE IF NOT EXISTS `borrowings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `book_copy_id` int(11) NOT NULL,
  `reservation_date` datetime NOT NULL,
  `due_date` datetime NOT NULL,
  `return_date` datetime DEFAULT NULL,
  `penalty` decimal(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `book_copy_id` (`book_copy_id`),
  KEY `book_id` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `borrowings`
--

INSERT INTO `borrowings` (`id`, `user_id`, `book_id`, `book_copy_id`, `reservation_date`, `due_date`, `return_date`, `penalty`) VALUES
(1, 12, 1, 1, '2025-06-04 09:00:00', '2025-06-18 09:00:00', '2025-06-14 12:00:00', 0.00),
(2, 4, 2, 2, '2026-07-03 09:00:00', '2026-07-17 09:00:00', '2026-07-30 12:00:00', 3.90),
(3, 3, 3, 3, '2026-06-04 09:00:00', '2026-06-18 09:00:00', '2026-06-15 12:00:00', 0.00),
(4, 15, 4, 4, '2026-03-05 09:00:00', '2026-03-19 09:00:00', '2026-03-16 12:00:00', 0.00),
(5, 19, 5, 5, '2026-03-11 09:00:00', '2026-03-25 09:00:00', '2026-04-07 12:00:00', 3.90),
(6, 5, 6, 6, '2025-08-17 09:00:00', '2025-08-31 09:00:00', NULL, 0.00),
(7, 20, 7, 7, '2025-03-05 09:00:00', '2025-03-19 09:00:00', '2025-03-26 12:00:00', 2.10),
(8, 3, 8, 8, '2025-08-15 09:00:00', '2025-08-29 09:00:00', '2025-08-28 12:00:00', 0.00),
(9, 11, 9, 9, '2026-03-06 09:00:00', '2026-03-20 09:00:00', '2026-03-18 12:00:00', 0.00),
(10, 20, 10, 10, '2025-11-12 09:00:00', '2025-11-26 09:00:00', '2025-12-12 12:00:00', 4.80),
(11, 7, 11, 11, '2025-04-16 09:00:00', '2025-04-30 09:00:00', '2025-05-15 12:00:00', 4.50),
(12, 8, 12, 12, '2026-01-17 09:00:00', '2026-01-31 09:00:00', '2026-02-17 12:00:00', 5.10),
(13, 4, 13, 13, '2026-08-01 09:00:00', '2026-08-15 09:00:00', '2026-08-16 12:00:00', 0.30),
(14, 17, 14, 14, '2026-06-29 09:00:00', '2026-07-13 09:00:00', '2026-07-18 12:00:00', 1.50),
(15, 16, 15, 15, '2026-08-23 09:00:00', '2026-09-06 09:00:00', NULL, 0.00),
(16, 13, 16, 16, '2025-11-03 09:00:00', '2025-11-17 09:00:00', '2025-11-17 12:00:00', 0.00),
(17, 24, 17, 17, '2025-09-07 09:00:00', '2025-09-21 09:00:00', '2025-09-25 12:00:00', 1.20),
(18, 18, 18, 18, '2026-05-22 09:00:00', '2026-06-05 09:00:00', NULL, 0.00),
(19, 25, 19, 19, '2026-04-05 09:00:00', '2026-04-19 09:00:00', '2026-04-16 12:00:00', 0.00),
(20, 5, 20, 20, '2026-06-09 09:00:00', '2026-06-23 09:00:00', '2026-07-12 12:00:00', 5.70),
(21, 12, 21, 21, '2025-06-05 09:00:00', '2025-06-19 09:00:00', NULL, 0.00),
(22, 15, 22, 22, '2025-02-10 09:00:00', '2025-02-24 09:00:00', NULL, 0.00),
(23, 4, 23, 23, '2026-07-26 09:00:00', '2026-08-09 09:00:00', '2026-08-14 12:00:00', 1.50),
(24, 12, 24, 24, '2025-12-25 09:00:00', '2026-01-08 09:00:00', '2026-01-21 12:00:00', 3.90),
(25, 27, 25, 25, '2026-04-13 09:00:00', '2026-04-27 09:00:00', '2026-04-24 12:00:00', 0.00),
(26, 10, 26, 26, '2026-05-01 09:00:00', '2026-05-15 09:00:00', NULL, 0.00),
(27, 4, 27, 27, '2025-03-04 09:00:00', '2025-03-18 09:00:00', NULL, 0.00),
(28, 11, 28, 28, '2026-08-15 09:00:00', '2026-08-29 09:00:00', NULL, 0.00),
(29, 28, 29, 29, '2026-04-02 09:00:00', '2026-04-16 09:00:00', '2026-04-23 12:00:00', 2.10),
(30, 30, 30, 30, '2025-12-22 09:00:00', '2026-01-05 09:00:00', '2026-01-14 12:00:00', 2.70);

--
-- Triggers `borrowings`
--
DELIMITER $$
CREATE TRIGGER `add_penalty_to_debt` AFTER UPDATE ON `borrowings` FOR EACH ROW BEGIN
    IF OLD.return_date IS NULL AND NEW.return_date IS NOT NULL THEN

        UPDATE users
        SET debt = COALESCE(debt, 0) + NEW.penalty
        WHERE id = NEW.user_id;

    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `calculate_penalty` BEFORE UPDATE ON `borrowings` FOR EACH ROW BEGIN
    IF OLD.return_date IS NULL AND NEW.return_date IS NOT NULL THEN

        SET NEW.penalty =
            GREATEST(
                DATEDIFF(NEW.return_date, NEW.due_date),
                0
            ) * 0.30;

    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `set_due_date` BEFORE INSERT ON `borrowings` FOR EACH ROW BEGIN
    SET NEW.due_date = DATE_ADD(NEW.reservation_date, INTERVAL 14 DAY);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `debt` decimal(10,2) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `debt`, `role`) VALUES
(1, 'Admin User', 'admin@library.fi', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'admin'),
(3, 'Anna Korhonen', 'anna.korhonen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(4, 'Jussi Nieminen', 'jussi.nieminen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 5.70, 'user'),
(5, 'Laura Mäkinen', 'laura.makinen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(6, 'Elias Laine', 'elias.laine@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(7, 'Sofia Heikkinen', 'sofia.heikkinen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 4.50, 'user'),
(8, 'Ville Hämäläinen', 'ville.hamalainen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 5.10, 'user'),
(9, 'Emilia Aaltonen', 'emilia.aaltonen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(10, 'Antti Lehtonen', 'antti.lehtonen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(11, 'Ella Rantanen', 'ella.rantanen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(12, 'Mikko Kinnunen', 'mikko.kinnunen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 3.90, 'user'),
(13, 'Aino Salonen', 'aino.salonen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(14, 'Oskari Jokinen', 'oskari.jokinen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(15, 'Veera Savolainen', 'veera.savolainen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(16, 'Leo Tuominen', 'leo.tuominen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(17, 'Emma Nurmi', 'emma.nurmi@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 1.50, 'user'),
(18, 'Aleksi Salmi', 'aleksi.salmi@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(19, 'Iida Koskinen', 'iida.koskinen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 3.90, 'user'),
(20, 'Eetu Niemi', 'eetu.niemi@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 6.90, 'user'),
(21, 'Sara Laakso', 'sara.laakso@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(22, 'Daniel Lindholm', 'daniel.lindholm@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(23, 'Noora Peltonen', 'noora.peltonen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(24, 'Rasmus Aalto', 'rasmus.aalto@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 1.20, 'user'),
(25, 'Olivia Berg', 'olivia.berg@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(26, 'Lauri Hakala', 'lauri.hakala@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(27, 'Hanna Vuorinen', 'hanna.vuorinen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(28, 'Joonas Salo', 'joonas.salo@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 2.10, 'user'),
(29, 'Maria Nykänen', 'maria.nykanen@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 0.00, 'user'),
(30, 'Niklas Öhman', 'niklas.ohman@example.com', '$2b$10$JvxC.BQC7HBBvxpNHv4afORVfHCF4FnHJZ54weEd4qqpVIphS91ty', 2.70, 'user'),
(31, 'natnael', 'nati@admin.com', '$2b$10$TdKUKl9kkau3j0l4L0MiVuZd4eIK349L8JsNRFX2HK5MWZ9CCaiTC', NULL, 'admin');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book_copies`
--
ALTER TABLE `book_copies`
  ADD CONSTRAINT `book_copies_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

--
-- Constraints for table `borrowings`
--
ALTER TABLE `borrowings`
  ADD CONSTRAINT `borrowings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `borrowings_ibfk_2` FOREIGN KEY (`book_copy_id`) REFERENCES `book_copies` (`id`),
  ADD CONSTRAINT `borrowings_ibfk_3` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
