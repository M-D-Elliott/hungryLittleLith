DROP DATABASE IF EXISTS hll;

CREATE DATABASE hll;

Use hll;

CREATE TABLE player(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    join_date DATETIME NOT NULL,
    user_name VARCHAR(30) NOT NULL,
    password VARCHAR(100) NOT NULL,
	email VARCHAR(255) NOT NULL,
    `enabled` boolean NOT NULL
);

create table `role`(
	`ID` INT PRIMARY KEY AUTO_INCREMENT,
	`role` VARCHAR(30) NOT NULL
);

create table `player_role`(
	`player_id` INT NOT NULL,
	`role_id` INT NOT NULL,
	primary key(`player_id`,`role_id`),
	foreign key (`player_id`) references `player`(`ID`),
	foreign key (`role_id`) references `role`(`ID`)
);

CREATE TABLE platform(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(125) NOT NULL,
    exists_on BOOLEAN NOT NULL
);

CREATE TABLE score(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    `value` INT NOT NULL,
    achieved_on DATETIME NOT NULL,
    player_ID INT NOT NULL,
    platform_ID INT NOT NULL,
    approved BOOLEAN NOT NULL,
    FOREIGN KEY (player_ID) REFERENCES player(ID),
    FOREIGN KEY (platform_ID) REFERENCES platform(ID)
);

CREATE TABLE replay(
	ID INT PRIMARY KEY AUTO_INCREMENT,
    uploaded_on DATETIME NULL,
    url VARCHAR(512) NULL,
	`score_id` INT NOT NULL,
	foreign key (`score_id`) references `score`(`ID`)
);

INSERT INTO player VALUES
(1, CURRENT_TIMESTAMP(), "admin", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "first_user@email.com", true),
(2, CURRENT_TIMESTAMP(), "firstUser", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "second_user@email.com", true),
(3, CURRENT_TIMESTAMP(), "johnnyuser", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "third@email.com", true),
(4, CURRENT_TIMESTAMP(), "randytodduser", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "fourth@email.com", true),
(5, CURRENT_TIMESTAMP(), "BillyBobCheater", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "fifth@email.com", true),
(6, CURRENT_TIMESTAMP(), "FairPlayer", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "sixth@email.com", true),
(7, CURRENT_TIMESTAMP(), "CorbinM", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "seventh@email.com", true),
(8, CURRENT_TIMESTAMP(), "jennyUser", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "eighth@email.com", true),
(9, CURRENT_TIMESTAMP(), "jennyHUser", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "ninth@email.com", true),
(10, CURRENT_TIMESTAMP(), "bethRuser", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "ninth@email.com", true),
(11, CURRENT_TIMESTAMP(), "ThomasS", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "ninth@email.com", true),
(12, CURRENT_TIMESTAMP(), "bethRuser", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "ninth@email.com", true),
(13, CURRENT_TIMESTAMP(), "JPullen", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "ninth@email.com", true),
(14, CURRENT_TIMESTAMP(), "JohnB", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "ninth@email.com", true),
(15, CURRENT_TIMESTAMP(), "JeffersonUser", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "ninth@email.com", true),
(16, CURRENT_TIMESTAMP(), "Julie", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "ninth@email.com", true),
(17, CURRENT_TIMESTAMP(), "JJacob", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "ninth@email.com", true),
(18, CURRENT_TIMESTAMP(), "Tara", "$2a$10$p03jdrs9akzd0auJhF5gVuD7bZiY/z3Osf7LNohCzlWhw3rmNCGPG", "ninth@email.com", true);

INSERT INTO platform VALUES
(1, "PC-HTML5Canvas", true),
(2, "PC-Steam", false),
(3, "MAC-Steam", false),
(4, "Andoid", false),
(5, "IOS", false),
(6, "Switch", false),
(7, "PS4", false),
(8, "Xbox-One", false);

insert into `role`(`ID`,`role`)
    values(1,"ROLE_ADMIN"), (2,"ROLE_USER");
    
insert into `player_role`(`player_id`,`role_id`)
    values
	(1,1),
	(1,2),
    (2,2),
    (3,2),
    (4,2),
    (5,2),
    (6,2),
    (7,2),
    (8,2),
    (9,2),
    (10,2),
    (11,2),
    (12,2),
    (13,2),
	(14,2),
	(15,2),
	(16,2),
	(17,2),
	(18,2);

INSERT INTO score VALUES
(1, 101, CURRENT_TIMESTAMP(), 1, 1, false),
(2, 102, CURRENT_TIMESTAMP(), 2, 1, false),
(3, 103, CURRENT_TIMESTAMP(), 3, 1, false),
(4, 104, CURRENT_TIMESTAMP(), 4, 1, false),
(5, 105, CURRENT_TIMESTAMP(), 5, 1, false),
(6, 106, CURRENT_TIMESTAMP(), 6, 1, false),
(7, 107, CURRENT_TIMESTAMP(), 7, 1, false),
(8, 108, CURRENT_TIMESTAMP(), 8, 1, false),
(9, 109, CURRENT_TIMESTAMP(), 9, 1, false),
(10, 110, CURRENT_TIMESTAMP(), 10, 1, false),
(11, 111, CURRENT_TIMESTAMP(), 11, 1, false),
(12, 112, CURRENT_TIMESTAMP(), 12, 1, true),
(13, 113, CURRENT_TIMESTAMP(), 13, 1, true),
(14, 114, CURRENT_TIMESTAMP(), 14, 1, false),
(15, 115, CURRENT_TIMESTAMP(), 15, 1, false),
(16, 116, CURRENT_TIMESTAMP(), 16, 1, false),
(17, 117, CURRENT_TIMESTAMP(), 17, 1, false),
(18, 118, CURRENT_TIMESTAMP(), 18, 1, false),
(19, 119, CURRENT_TIMESTAMP(), 2, 1, false),
(20, 120, CURRENT_TIMESTAMP(), 3, 1, false),
(21, 200000, CURRENT_TIMESTAMP(), 5, 1, true),
(22, 118, CURRENT_TIMESTAMP(), 4, 1, false),
(23, 119, CURRENT_TIMESTAMP(), 5, 1, false),
(24, 120, CURRENT_TIMESTAMP(), 14, 1, false),
(25, 118, CURRENT_TIMESTAMP(), 12, 1, false),
(26, 119, CURRENT_TIMESTAMP(), 11, 1, false),
(27, 120, CURRENT_TIMESTAMP(), 10, 1, false);

INSERT INTO replay VALUES
(1, CURRENT_TIMESTAMP(), "https://www.youtube.com/watch?v=XyNlqQId-nk", 1),
(2, CURRENT_TIMESTAMP(), "https://www.youtube.com/watch?v=XyNlqQId-nk", 1),
(3, CURRENT_TIMESTAMP(), "https://www.youtube.com/watch?v=XyNlqQId-nk", 2),
(4, CURRENT_TIMESTAMP(), "https://www.youtube.com/watch?v=XyNlqQId-nk", 21);