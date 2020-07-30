-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-07-30 08:37:48
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
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `eeId` int(10) UNSIGNED NOT NULL,
  `eeAccount` mediumtext NOT NULL,
  `eePassword` mediumtext NOT NULL,
  `eeEmail` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`eeId`, `eeAccount`, `eePassword`, `eeEmail`) VALUES
(2, '1234', '4321', '1234@gmail.com'),
(3, '<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <!-- <link rel=\"stylesheet\" href=\"../_css/bootstrap.min.css\"> -->\r\n    <script src=\"../_js/jquery.min.js\"></script>\r\n    <script src=\"../_js/popper.min.js\"></script>\r\n    <script src=\"../_js/bootstrap.min.js\"></script>\r\n    <script src=\"flycan.js\"></script>\r\n\r\n    <title>Document</title>\r\n    <link rel=\"stylesheet\" href=\"style copy.css\">\r\n</head>', '<body id=\"chart3\">\r\n\r\n\r\n    <!-- <div class=\"title\"> -->\r\n    <!-- <div class=\"login1\">\r\n        <a href=\"antique_product2.html\"><img src=\"image/antique/Image 9.jpg\" width=\"30px\">\r\n            <p class=\"login3\">0</p>\r\n        </a>\r\n    </div>\r\n    <div class=\"login2\"><a href=\"\">Login/Join</a></div> -->\r\n\r\n    <!-- <div class=\"tit\"> -->\r\n    <!-- 標題和LOGO -->\r\n\r\n    <!-- <div>\r\n        <a href=\"Xiang se.html\" id=\"logo\"><img src=\"image/antique/log1.jpg\" alt=\"\"></a>\r\n    </div> -->\r\n\r\n    <!-- <h1>delicate antique</h1> -->\r\n    <!-- </div> -->\r\n\r\n\r\n\r\n    <!-- 選單 -->\r\n    <!-- <nav class=\"navBar\">\r\n            <ul>\r\n                <li>\r\n                    <h5><a href=\"Xiang se.html\">ALL</a></h5>\r\n                </li>\r\n                <li>\r\n                    <h5><a href=\"Xiang se_specialty.html\">HOME</a></h5>\r\n                </li>\r\n                <li>\r\n                    <h5><a href=\"Xiang se_menu.html\">SALE</a></h5>\r\n                </li>\r\n\r\n                <li>\r\n                    <h5><a href=\"Xiang se_about.html\">ABOUT</a></h5>\r\n                </li>\r\n\r\n            </ul>\r\n        </nav>\r\n    </div> -->\r\n\r\n    <!-- 導覽頁 -->\r\n    <div class=\"title\">\r\n\r\n        <nav class=\"navBar navbar-expand-md navbar-light bg-wight p-1\" id=\"notoSans\">\r\n\r\n\r\n\r\n            <div class=\"mx-auto order-0\" style=\"margin-top: 18px;\">\r\n                <a class=\"navbar-brand p-0\" href=\"#\">\r\n                    <div class=\"tit\">\r\n                        <img src=\"image/antique/log1.jpg\" alt=\"\">\r\n                    </div>\r\n                </a>\r\n\r\n            </div>\r\n\r\n            <button class=\"navbar-toggler \" type=\"button\" data-toggle=\"collapse\" data-target=\".dual-collapse2\">\r\n                <span class=\"navbar-toggler-icon\"></span>\r\n            </button>\r\n\r\n            <div class=\"navbar-collapse collapse  dual-collapse2\">\r\n                <ul class=\"navbar-nav mr-auto\">\r\n                    <li class=\"nav-item active\">\r\n                        <h5 class=\"nav-link\"><a href=\"Xiang se.html\">ALL</a></h5>\r\n                    </li>\r\n                    <li class=\"nav-item active\">\r\n                        <h5 class=\"nav-link\"><a href=\"Xiang se_specialty.html\">HOME</a></h5>\r\n                    </li>\r\n                    <li class=\"nav-item active\">\r\n                        <h5 class=\"nav-link\"><a href=\"Xiang se_menu.html\">SALE</a></h5>\r\n                    </li>\r\n\r\n                    <li class=\"nav-item active\">\r\n                        <h5 class=\"nav-link\"><a href=\"Xiang se_about.html\">ABOUT</a></h5>\r\n                    </li>\r\n\r\n                </ul>\r\n                <form class=\"form-inline ml-auto\">\r\n                    <div style=\"margin-top: -11px;\">\r\n                        <div class=\"login1\">\r\n                            <a href=\"antique_product2.html\"><img src=\"image/antique/Image 9.jpg\" width=\"30px\">\r\n                                <p class=\"login3\">0</p>\r\n                            </a>\r\n                        </div>\r\n                        <div class=\"login2\"><a href=\"\">Login/Join</a></div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n\r\n\r\n\r\n\r\n            <!-- LOGO -->\r\n\r\n        </nav>\r\n    </div>\r\n\r\n    <div class=\"container ctr \">\r\n        <div class=\"row\">\r\n            <div class=\"col-12 cot4\">\r\n                <img src=\"image/antique/antique_bg1.jpg\" style=\"width: 100%;\" class=\"cot4-1 change\">\r\n                <img src=\"image/antique/antique_bg4.jpg\" style=\"width: 100%;\" class=\"cot4-2 \">\r\n                <img src=\"image/antique/antique_bg2.jpg\" style=\"width: 100%;\" class=\"cot4-2 \">\r\n                <img src=\"image/antique/antique_bg3.jpg\" style=\"width: 100%;\" class=\"cot4-2 \">\r\n            </div>\r\n            <hr>\r\n\r\n            <div class=\"pro col-12 \">\r\n                <h5 class=\"product\">KIND</h5>\r\n                <!--  品項 -->\r\n            </div>\r\n\r\n            <a class=\"col-6 col-md-4 ctr_1 \" href=\"Xiang se_appetizer.html\">\r\n                <div class=\"ctr_1--c1\">\r\n                    <p><span>CHAIR</span></p>\r\n                </div>\r\n\r\n            </a>\r\n            <a class=\"col-6 col-md-4 ctr_1 \" href=\"Xiang se_maincourse.html\">\r\n                <div class=\"ctr_1--c2\">\r\n                    <p><span>DESK</span></p>\r\n                </div>\r\n            </a>\r\n            <a class=\"col-6 col-md-4 ctr_1 \" href=\"Xiang se_soup.html\">\r\n                <div class=\"ctr_1--c3\">\r\n                    <p><span>SOFA</span></p>\r\n                </div>\r\n            </a>\r\n            <a class=\"col-6 col-md-4 ctr_1 \" href=\"Xiang se_wine.html\">\r\n                <div class=\"ctr_1--c4\">\r\n                    <p><span>TABLE</span></p>\r\n                </div>\r\n            </a>\r\n            <a class=\"col-6 col-md-4 ctr_1 \" href=\"Xiang se_drink.html\">\r\n                <div class=\"ctr_1--c5\">\r\n                    <p><span>CUPBOARD</span></p>\r\n                </div>\r\n            </a>\r\n            <a class=\"col-6 col-md-4 ctr_1  \" href=\"Xiang se_dessert.html\">\r\n                <div class=\"ctr_1--c6\">\r\n                    <p><span>DECORATION</span></p>\r\n                </div>\r\n            </a>\r\n\r\n        </div>\r\n    </div>\r\n\r\n\r\n\r\n\r\n\r\n    <div class=\"pro\">\r\n        <h5 class=\"product\">精選商品</h5>\r\n    </div>\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"pic1\">\r\n                <img src=\"image/antique/Image 16.jpg\" class=\"litpic_1 col-6 col-md-3\">\r\n                <img src=\"image/antique/Image 17.jpg\" class=\"litpic_1 col-6 col-md-3\">\r\n                <img src=\"image/antique/Image 18.jpg\" class=\"litpic_1 col-6 col-md-3\">\r\n                <img src=\"image/antique/Image 19.jpg\" class=\"litpic_1 col-6 col-md-3\">\r\n                <img src=\"image/antique/Image 20.jpg\" class=\"litpic_1 col-6 col-md-3\">\r\n                <img src=\"image/Xiang se/pic_6.jpg\" class=\"litpic_1 col-6 col-md-3\"><br><br>\r\n\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <footer>\r\n        <div class=\"footerBar\">\r\n            <div class=\"container ctr2\">\r\n\r\n\r\n\r\n                <div class=\"row\">\r\n\r\n                    <ul class=\" col-md-5\">\r\n                        <li>\r\n                            <h5>商品分類</h5>\r\n                        </li>\r\n                        <li>椅凳</li>\r\n                        <li>書桌</li>\r\n                        <li>桌子</li>\r\n                        <li>櫥櫃</li>\r\n                        <li>家飾</li>\r\n                        <li>沙發</li>\r\n\r\n                    </ul><br>\r\n\r\n                    <ul class=\" col-md-5\">\r\n                        <li>\r\n                            <h5>delicate antique</h5>\r\n\r\n                        </li>\r\n                        <li>關於我們</li>\r\n                        <li>聯絡我們</li>\r\n\r\n                    </ul><br>\r\n\r\n                    <ul class=\"col-md-2 footerLogo\">\r\n\r\n                        <li>\r\n                            <a href=\"Xiang se.html\"></a><img src=\"image/antique/log1.jpg\" width=\"300\" c></a>\r\n                        </li>\r\n\r\n\r\n                    </ul><br>\r\n                    <!-- <ul>\r\n                    <h5>Xiang se</h5>\r\n                    <li>聯絡我們</li>\r\n                    <li>關於我們</li>\r\n\r\n                </ul> -->\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n        </div>\r\n\r\n\r\n    </footer>\r\n\r\n\r\n</body>', '</html>');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`eeId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `eeId` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
