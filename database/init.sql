CREATE DATABASE IF NOT EXISTS `sc` DEFAULT CHARACTER SET utf8 ;
USE `sc` 

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `catid` int(11) NOT NULL AUTO_INCREMENT,
  `level` text COLLATE utf8_bin,
  `href` text COLLATE utf8_bin,
  `name` text COLLATE utf8_bin,
  `flag` int(11) DEFAULT '0',
  PRIMARY KEY (`catid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

