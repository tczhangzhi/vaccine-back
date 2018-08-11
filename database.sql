# Host: 118.31.39.26  (Version 5.7.21-0ubuntu0.16.04.1)
# Date: 2018-07-09 12:57:55
# Generator: MySQL-Front 5.4  (Build 4.153) - http://www.mysqlfront.de/

/*!40101 SET NAMES utf8 */;

#
# Structure for table "child"
#

CREATE TABLE `child` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8mb4 COMMENT '姓名',
  `days` int(11) DEFAULT NULL COMMENT '年龄',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4707 DEFAULT CHARSET=utf8;

#
# Structure for table "config"
#

CREATE TABLE `config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `scheduling` text COMMENT '第n种疫苗第m次接种的最早和最晚时间',
  `times` int(11) DEFAULT NULL COMMENT '第n种疫苗需要m次接种',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

#
# Structure for table "user"
#

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  `password` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

#
# Structure for table "vaccine"
#

CREATE TABLE `vaccine` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `start` int(11) DEFAULT NULL COMMENT '第n种疫苗的最早接种时间',
  `end` int(11) DEFAULT NULL COMMENT '第n种疫苗的最晚接种时间',
  `configId` int(11) DEFAULT NULL COMMENT '需要接种第n种疫苗',
  `childId` int(11) DEFAULT NULL COMMENT '外键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30144 DEFAULT CHARSET=utf8;
