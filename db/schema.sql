CREATE SCHEMA burgers_db;

CREATE TABLE burgers_db.menu
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    burger_name VARCHAR(255) NOT NULL,
    retired TINYINT NOT NULL,
    date TIMESTAMP NOT NULL
);