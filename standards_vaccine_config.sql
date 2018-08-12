# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 118.31.39.26 (MySQL 5.7.21-0ubuntu0.16.04.1)
# Database: vaccine
# Generation Time: 2018-08-12 04:15:07 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table config
# ------------------------------------------------------------

DROP TABLE IF EXISTS `config`;

CREATE TABLE `config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `scheduling` text COMMENT '第n种疫苗第m次接种的最早和最晚时间',
  `times` int(11) DEFAULT NULL COMMENT '第n种疫苗需要m次接种',
  `space` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;

INSERT INTO `config` (`id`, `scheduling`, `times`, `space`)
VALUES
	(18,'[{\"start\":0,\"end\":1,\"space\":28},{\"start\":1,\"end\":30,\"space\":60},{\"start\":90,\"end\":360,\"space\":0},{\"start\":0,\"end\":0,\"space\":0}]',4,NULL),
	(19,'[{\"start\":0,\"end\":90,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0}]',4,NULL),
	(20,'[{\"start\":30,\"end\":60,\"space\":28},{\"start\":60,\"end\":90,\"space\":28},{\"start\":90,\"end\":120,\"space\":28},{\"start\":120,\"end\":1460,\"space\":0}]',4,NULL),
	(21,'[{\"start\":60,\"end\":90,\"space\":28},{\"start\":90,\"end\":120,\"space\":28},{\"start\":120,\"end\":150,\"space\":180},{\"start\":150,\"end\":547,\"space\":0}]',4,NULL),
	(22,'[{\"start\":2190,\"end\":2555,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0}]',4,NULL),
	(23,'[{\"start\":240,\"end\":365,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0}]',4,NULL),
	(24,'[{\"start\":270,\"end\":547,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0}]',4,NULL),
	(25,'[{\"start\":182,\"end\":240,\"space\":0},{\"start\":730,\"end\":1095,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0}]',4,NULL),
	(26,'[{\"start\":240,\"end\":270,\"space\":7},{\"start\":270,\"end\":365,\"space\":30},{\"start\":730,\"end\":1095,\"space\":0},{\"start\":2190,\"end\":2555,\"space\":0}]',4,NULL),
	(27,'[{\"start\":150,\"end\":182,\"space\":90},{\"start\":272,\"end\":547,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0}]',4,NULL),
	(28,'[{\"start\":1095,\"end\":1460,\"space\":0},{\"start\":2190,\"end\":2555,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0}]',4,NULL),
	(29,'[{\"start\":547,\"end\":730,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0}]',4,NULL),
	(30,'[{\"start\":547,\"end\":730,\"space\":180},{\"start\":730,\"end\":1095,\"space\":0},{\"start\":0,\"end\":0,\"space\":0},{\"start\":0,\"end\":0,\"space\":0}]',4,NULL);

/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
