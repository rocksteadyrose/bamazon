# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.20)
# Database: bamazon
# Generation Time: 2018-05-14 20:10:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `department_name` varchar(100) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT '0',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`)
VALUES
	(1,'Bounty Select-a-Size Paper Towels','Household Supplies',32.90,100),
	(2,'Friends Dont Lie Stranger Things Waffle Shirt','Clothing, Shoes, & Jewelry',18.95,55),
	(3,'Into the Woods (Original Broadway Cast Recording)','CDs & Vinyl',8.98,14),
	(4,'Furbo Dog Camera','Pet Supplies',249.00,95),
	(5,'Cookies, Chips, & Candies Snacks Variety Pack Bulk Sampler','Groceries & Gourmet Food',23.74,200),
	(6,'Disney Original Concept Painting From 1964 for \'Its a Small World\' by Mary Blair','Collectibles & Fine Art',30000.00,1),
	(7,'Nintendo 64 System','Video Games',77.99,93),
	(8,'King\'s Quest Collection: 7 Full Games','Video Games',25.99,4),
	(9,'Apple iPhone X, Fully Unlocked 5.8\', 64 GB','Cell Phones & Accessories',1139.00,11),
	(10,'essie 2018 Seaglass Shimmers Nail Polish Collection','Beauty & Personal Care',9.00,100);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
