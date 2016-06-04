DROP TABLE IF EXISTS employee;

CREATE TABLE employee(
    id	   BIGINT UNSIGNED           NOT NULL AUTO_INCREMENT ,
    name     VARCHAR(32)           	       NULL 			 ,
    password     VARCHAR(32)           	       NULL 		,
    email	 VARCHAR(32)                NULL 	         ,
    role	 BIGINT UNSIGNED              NULL 	    ,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

insert into employee (`name`,`password`,email,role) values("wangsy","12345,","2234wwe@163.com","1");
select  * from employee;


