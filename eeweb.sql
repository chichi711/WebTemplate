-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-07-31 10:21:10
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `eeweb`
--

-- --------------------------------------------------------

--
-- 資料表結構 `account`
--

CREATE TABLE `account` (
  `aID` tinyint(2) UNSIGNED ZEROFILL NOT NULL,
  `mID` tinyint(2) UNSIGNED ZEROFILL NOT NULL,
  `tID` tinyint(2) UNSIGNED ZEROFILL NOT NULL,
  `aName` varchar(20) COLLATE utf8_unicode_ci DEFAULT 'eeWeb template',
  `explain` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pic` varchar(1000) COLLATE utf8_unicode_ci DEFAULT 'default.jpg',
  `date` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `account`
--

INSERT INTO `account` (`aID`, `mID`, `tID`, `aName`, `explain`, `pic`, `date`) VALUES
(01, 01, 01, 'eeWeb template', 'yayayayayaya', 'user.jpg', '07/31');

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `mID` tinyint(2) UNSIGNED ZEROFILL NOT NULL,
  `uName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `uPwd` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `img` varchar(300) COLLATE utf8_unicode_ci DEFAULT 'user.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`mID`, `uName`, `Email`, `uPwd`, `img`) VALUES
(01, 'chichi', 'chi@gmail.com', 'aaa', 'user.jpg');

-- --------------------------------------------------------

--
-- 資料表結構 `pages`
--

CREATE TABLE `pages` (
  `pID` tinyint(2) UNSIGNED ZEROFILL NOT NULL,
  `pName` varchar(20) COLLATE utf8_unicode_ci DEFAULT 'eeWeb template',
  `aID` tinyint(2) UNSIGNED ZEROFILL NOT NULL,
  `body` varchar(10000) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `pages`
--

INSERT INTO `pages` (`pID`, `pName`, `aID`, `body`) VALUES
(01, 'index', 01, '<body><h1>index</h1></body>'),
(02, 'member', 01, '<body><h1>member</h1></body>'),
(03, 'car', 01, '<body><h1>car</h1></body>');

-- --------------------------------------------------------

--
-- 資料表結構 `template`
--

CREATE TABLE `template` (
  `tID` tinyint(2) UNSIGNED ZEROFILL NOT NULL,
  `tName` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `type` tinyint(2) NOT NULL,
  `pages` tinyint(2) DEFAULT 1,
  `begin` varchar(2000) COLLATE utf8_unicode_ci NOT NULL,
  `end` varchar(500) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `template`
--

INSERT INTO `template` (`tID`, `tName`, `type`, `pages`, `begin`, `end`) VALUES
(01, 'antique', 1, 6, '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Document</title>\r\n</head>', '</html>');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`aID`),
  ADD KEY `mID` (`mID`),
  ADD KEY `tID` (`tID`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`mID`);

--
-- 資料表索引 `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`pID`),
  ADD KEY `aID` (`aID`);

--
-- 資料表索引 `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`tID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `account`
--
ALTER TABLE `account`
  MODIFY `aID` tinyint(2) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `mID` tinyint(2) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `pages`
--
ALTER TABLE `pages`
  MODIFY `pID` tinyint(2) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `template`
--
ALTER TABLE `template`
  MODIFY `tID` tinyint(2) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`mID`) REFERENCES `member` (`mID`),
  ADD CONSTRAINT `account_ibfk_2` FOREIGN KEY (`tID`) REFERENCES `template` (`tID`);

--
-- 資料表的限制式 `pages`
--
ALTER TABLE `pages`
  ADD CONSTRAINT `pages_ibfk_1` FOREIGN KEY (`aID`) REFERENCES `account` (`aID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
