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

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `products` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `catid` int(11) DEFAULT NULL,
  `level` text,
  `page` int(11) DEFAULT NULL,
  `name` text,
  `href` text,
  `flag` int(11) DEFAULT '0',
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pages`;
CREATE TABLE `sc`.`pages` (
  `pageid` INT NOT NULL AUTO_INCREMENT,
  `catid` TEXT NULL,
  `level` TEXT NULL,
  `href` TEXT NULL,
  `flag` INT NULL DEFAULT 0,
  PRIMARY KEY (`pageid`))
ENGINE = MyISAM;
