DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
  id       BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name     VARCHAR(32)     NULL,
  password VARCHAR(32)     NULL,
  email    VARCHAR(32)     NULL,
  role     BIGINT UNSIGNED NULL,
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

INSERT INTO employee (`name`, `password`, email, role) VALUES
  ("wangsy11", "1~2(3)4&*5$", "2234wwe@163.com", "1"),
  ("wangsy22", "1~2(3)4&*5$", "2234wwe@163.com", "1"),
  ("wangsy33", "1~2(3)4&*5$", "2234wwe@163.com", "1"),
  ("wangsy44", "1~2(3)4&*5$", "2234wwe@163.com", "1"),
  ("wangsy55", "1~2(3)4&*5$", "2234wwe@163.com", "1"),
  ("wangsy66", "1~2(3)4&*5$", "2234wwe@163.com", "1");
SELECT * FROM employee;


