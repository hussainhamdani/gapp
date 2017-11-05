-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2017 at 10:25 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gapp`
--
CREATE DATABASE IF NOT EXISTS `gapp` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `gapp`;

-- --------------------------------------------------------

--
-- Table structure for table `genetic_results`
--

DROP TABLE IF EXISTS `genetic_results`;
CREATE TABLE `genetic_results` (
  `iResultId` int(11) UNSIGNED NOT NULL,
  `iUserId` int(11) UNSIGNED DEFAULT NULL,
  `vGeneticTestOne` varchar(255) DEFAULT NULL,
  `vGeneticTestTwo` varchar(255) DEFAULT NULL,
  `vGeneticTestThree` varchar(255) DEFAULT NULL,
  `vGeneticTestFour` varchar(255) DEFAULT NULL,
  `vGeneticTestFive` varchar(255) DEFAULT NULL,
  `vGeneticTestSix` varchar(255) DEFAULT NULL,
  `dTestDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `eStatus` enum('Inprogress','Done') NOT NULL DEFAULT 'Inprogress'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `genetic_results`
--

INSERT INTO `genetic_results` (`iResultId`, `iUserId`, `vGeneticTestOne`, `vGeneticTestTwo`, `vGeneticTestThree`, `vGeneticTestFour`, `vGeneticTestFive`, `vGeneticTestSix`, `dTestDate`, `eStatus`) VALUES
(1, 1, '-Result-', '-Result-', '-Result-', '-Result-', '-Result-', '-Result-', '2017-11-05 08:36:25', 'Done');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `iUserId` int(11) UNSIGNED NOT NULL,
  `vEmail` varchar(255) DEFAULT NULL,
  `vPassword` varchar(255) DEFAULT NULL,
  `vFirstName` varchar(100) DEFAULT NULL,
  `vLastName` varchar(100) DEFAULT NULL,
  `vPolicyCode` varchar(11) DEFAULT NULL,
  `dDateOfBirth` date DEFAULT NULL,
  `dProfileCreationDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `eStatus` enum('Active','Inactive') NOT NULL DEFAULT 'Inactive'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`iUserId`, `vEmail`, `vPassword`, `vFirstName`, `vLastName`, `vPolicyCode`, `dDateOfBirth`, `dProfileCreationDate`, `eStatus`) VALUES
(1, 'user@gmail.com', '123456789', 'Firstname', 'Firstname', 'Xy123uNop1', '1991-11-08', '2017-11-04 10:17:09', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `genetic_results`
--
ALTER TABLE `genetic_results`
  ADD PRIMARY KEY (`iResultId`),
  ADD KEY `User Id` (`iUserId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`iUserId`),
  ADD UNIQUE KEY `Email` (`vEmail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `genetic_results`
--
ALTER TABLE `genetic_results`
  MODIFY `iResultId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `iUserId` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `genetic_results`
--
ALTER TABLE `genetic_results`
  ADD CONSTRAINT `User Relation` FOREIGN KEY (`iUserId`) REFERENCES `users` (`iUserId`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
