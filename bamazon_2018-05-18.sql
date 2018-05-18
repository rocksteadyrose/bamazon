# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.20)
# Database: bamazon
# Generation Time: 2018-05-18 20:03:14 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table departments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `departments`;

CREATE TABLE `departments` (
  `department_id` int(100) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) NOT NULL,
  `over_head_costs` decimal(10,2) NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;

INSERT INTO `departments` (`department_id`, `department_name`, `over_head_costs`)
VALUES
	(1,'Home & Kitchen',2000.00),
	(2,'Jewelry',3000.00),
	(3,'Cell Phones & Accessories',1000.00),
	(4,'Video Games',500.00),
	(5,'Collectibles & Fine Art',1000.00),
	(6,'Pet Supplies',1000.00),
	(7,'Clothing, Shoes, & Jewelry',2000.00),
	(8,'Beauty & Personal Care',500.00),
	(9,'Groceries & Gourmet Food',500.00),
	(10,'Electronics',1000.00),
	(11,'Household Supplies',500.00),
	(12,'TV Shows',1000.00),
	(13,'Garden',3000.00),
	(14,'Outdoor Living',20000.00),
	(15,'Hair Care',2000.00);

/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT '0',
  `product_sales` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES
	(1,'Bounty Select-a-Size Paper Towels','Household Supplies',32.90,651,1019.90),
	(2,'Friends Dont Lie Stranger Things Waffle Shirt','Clothing, Shoes, & Jewelry',18.95,1710,246.35),
	(3,'Into the Woods (Original Broadway Cast Recording)','CDs & Vinyl',8.98,44,53.88),
	(4,'Furbo Dog Camera','Pet Supplies',249.00,73,4482.00),
	(5,'Cookies, Chips, & Candies Snacks Variety Pack Bulk Sampler','Groceries & Gourmet Food',23.74,21,47.48),
	(6,'Disney Original Concept Painting From 1964 for \'Its a Small World\' by Mary Blair','Collectibles & Fine Art',30000.00,6,30000.00),
	(7,'Nintendo 64 System','Video Games',77.99,76,701.91),
	(8,'King\'s Quest Collection: 7 Full Games','Video Games',25.99,11,51.98),
	(9,'Apple iPhone X, Fully Unlocked 5.8\', 64 GB','Cell Phones & Accessories',1139.00,202,4556.00),
	(10,'essie 2018 Seaglass Shimmers Nail Polish Collection','Beauty & Personal Care',9.00,75,207.00),
	(11,'Justyne Gold Statement Earrings In Blush Mix Mother Of Pearl','Jewelry',250.00,472,3750.00),
	(12,'Love Angel Music Baby CD','Digital Music',8.29,200,41.45),
	(13,'Coffee Books and Rain Inspirational Throw Pillow','Home & Kitchen',8.79,6,202.17),
	(14,'Giant Memory Foam Beanbag Chair','Home & Kitchen',337.38,6,2361.66),
	(15,'The Handmaid\'s Tale Season 1','TV Shows',24.99,187,999.60),
	(16,'Bamazon BAMexa','Electronics',150.00,2928,40800.00),
	(17,'Epic Pancake Mix','Groceries & Gourmet Food',12.00,237,156.00),
	(18,'Cookies And Cream Fresh Step Kitty Litter','Pet Supplies',30.00,179,630.00),
	(19,'Sunjoy Gazebo','Garden',139.00,15,695.00),
	(20,'The Most Epic Bandana Ever','Clothing, Shoes, & Jewelry',20.00,500,0.00),
	(21,'8GB Sushi USB Flash Drive','Electronics',11.99,302,0.00),
	(22,'The Biggest Gummy Bear In The World','Groceries & Gourmet Food',15.99,600,0.00),
	(23,'Patio Set','Outdoor Living',2000.00,180,40000.00),
	(24,'Big, Beautiful, Bold Locks','Hair Care',20.00,480,400.00),
	(25,'The Blondest and Most Beautiful Hair Dye!','Hair Care',15.00,18,30.00);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
