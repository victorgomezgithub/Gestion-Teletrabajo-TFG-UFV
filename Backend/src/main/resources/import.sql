INSERT INTO dempresas (id_empresa,nombre_empresa) VALUES (1,'Atmira');


INSERT INTO dconfiguracion (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (1,1,'Duración máxima de las reuniones','60','Aviso');
INSERT INTO dconfiguracion (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (2,1,'Descanso entre reuniones','30','Aviso');
INSERT INTO dconfiguracion (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (3,1,'Numero máximo de reuniones diarias','5','Aviso');
INSERT INTO dconfiguracion (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (4,1,'Tiempo de respeto para la entrada y la salida','10','Aviso');
INSERT INTO dconfiguracion (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (5,1,'Maximo de integrantes por reunión','5','Aviso');


INSERT INTO dcoworkings (id_coworking,id_empresa_fk,descripcion,direccion, ejex,ejey,color) VALUES (1,1,'Horario de 8 a 17','Madrid, Calle la Palma 50', -3.671669555529015,40.428698930931326,'#FF5733');
INSERT INTO dcoworkings (id_coworking,id_empresa_fk,descripcion,direccion,ejex,ejey,color) VALUES (2,1,'Cómodo y con cafetería','Madrid, Calle la Palma 38', -3.7199799606661146,40.427774941309465,'#B64830');

INSERT INTO dempleados (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user1','Levi Ackerman','levi.atmira@gmail.com','1234','Empleado','07:00','15:00','1','IT');
INSERT INTO dempleados (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user2','Sancho Panza', 'sancho.atmira@gmail.com','1234','Empleado' ,'08:00','18:00','1','IT');
INSERT INTO dempleados (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user3','Victor Gomez', 'victor.atmira@gmail.com','1234','Empleado' ,'09:00','17:00','1','RH');
INSERT INTO dempleados (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user4','Paco Sanchez', 'paco.atmira@gmail.com','1234','Empleado' ,'08:00','16:00','1','RH');
INSERT INTO dempleados (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('admin','Administrador', 'administrador.atmira@gmail.com','1234','administrador' ,'09:00','17:00','1','RH');
INSERT INTO dempleados (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user5','Raul González','raul.atmira@gmail.com','1234','Empleado','09:00','17:00','1','ARQ');
INSERT INTO dempleados (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user6','Laura Rodríguez', 'laura.atmira@gmail.com','1234','Empleado' ,'09:00','17:00','1','ARQ');
INSERT INTO dempleados (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user7','Felipe Reyes', 'felipe.atmira@gmail.com','1234','Empleado' ,'09:30','17:30','1','QA');
INSERT INTO dempleados (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user8','Mario Marino', 'mario.atmira@gmail.com','1234','Empleado' ,'09:00','17:00','1','QA');

INSERT INTO dreuniones (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (1,'Reunion 1','Descripcion reunion 1','2021-06-15 17:00:00','2021-06-15 19:00:00',NULL,1);
INSERT INTO dreuniones (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (2,'Reunion 2','Descripcion reunion 2','2021-06-25 08:00:00','2021-06-25 09:00:00',NULL,1);
INSERT INTO dreuniones (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (3,'Reunion 3','Descripcion reunion 3','2021-06-29 09:45:00','2021-06-29 11:00:00',NULL,2);
INSERT INTO dreuniones (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (4,'Reunion 4','Descripcion reunion 4','2021-06-29 16:30:00','2021-06-29 19:00:00',NULL,2);
INSERT INTO dreuniones (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (5,'Reunion 5','Descripcion reunion 5','2021-06-28 17:30:00','2021-06-28 19:00:00',NULL,NULL);
INSERT INTO dreuniones (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (6,'Reunion 6','Descripcion reunion 6','2021-06-28 14:30:00','2021-06-28 15:00:00',NULL,NULL);


INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (1,1,1);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (2,1,5);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (3,2,5);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (5,3,4);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (6,3,1);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (7,4,2);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (8,4,5);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (9,5,5);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (10,5,1);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (11,6,3);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (13,6,5);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (14,5,6);
INSERT INTO dreunionesempleado (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (15,5,7);

