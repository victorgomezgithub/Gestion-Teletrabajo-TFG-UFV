INSERT INTO DEMPRESAS (id_empresa,nombre_empresa) VALUES (1,'Atmira');


INSERT INTO DCONFIGURACION (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (1,1,'Duración máxima de las reuniones','60','Aviso');
INSERT INTO DCONFIGURACION (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (2,1,'Descanso entre reuniones','30','Aviso');
INSERT INTO DCONFIGURACION (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (3,1,'Numero máximo de reuniones diarias','5','Aviso');
INSERT INTO DCONFIGURACION (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (4,1,'Tiempo de respeto para la entrada y la salida','10','Aviso');
INSERT INTO DCONFIGURACION (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (5,1,'Maximo de integrantes por reunión','5','Obligatorio');


INSERT INTO DCOWORKINGS (id_coworking,id_empresa_fk,descripcion,direccion, ejex,ejey,color) VALUES (1,1,'Lugar de lujo con horario de x a y','Madrid, Calle la Palma 50', -3.671669555529015,40.428698930931326,'#FF5733');
INSERT INTO DCOWORKINGS (id_coworking,id_empresa_fk,descripcion,direccion,ejex,ejey,color) VALUES (2,1,'Lugar cómodo con horario de x a y','Madrid, Calle la Palma 38', -3.7199799606661146,40.427774941309465,'#B64830');

INSERT INTO DEMPLEADOS (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user1','Levi Ackerman','emailInventado@gmail.com','1234','Empleado','09:00','17:00','1','IT');
INSERT INTO DEMPLEADOS (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user2','Sancho Panza', 'emailInventado@gmail.com','1234','Empleado' ,'09:00','17:00','1','IT');
INSERT INTO DEMPLEADOS (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user3','Victor Gomez', 'emailInventado@gmail.com','1234','Empleado' ,'09:00','17:00','1','RH');
INSERT INTO DEMPLEADOS (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user4','Paco Sanchez', 'emailInventado@gmail.com','1234','Empleado' ,'09:00','17:00','1','RH');
INSERT INTO DEMPLEADOS (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('admin','Administrador', 'emailInventado@gmail.com','1234','administrador' ,'09:00','17:00','1','RH');

INSERT INTO DREUNIONES (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (1,'Reunion 1','Descripcion reunion 1','2021-03-19 18:00:00','2021-03-19 20:00:00','Word',1);
INSERT INTO DREUNIONES (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (2,'Reunion 2','Descripcion reunion 2','2021-05-24 18:00:00','2021-05-24 20:00:00','Excel',1);
INSERT INTO DREUNIONES (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (3,'Reunion 3','Descripcion reunion 3','2021-04-27 10:00:00','2021-04-27 12:00:00','Word',1);
INSERT INTO DREUNIONES (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (4,'Reunion 4','Descripcion reunion 4','2021-04-30 09:00:00','2021-04-30 10:00:00','Excel',2);
INSERT INTO DREUNIONES (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (5,'Reunion 5','Descripcion reunion 5','2021-05-01 10:00:00','2021-05-01 14:00:00','Word',2);
INSERT INTO DREUNIONES (id_reunion,title,description,start_date,end_date,documento, id_coworking_fk) VALUES (6,'Reunion 6','Descripcion reunion 6','2021-06-25 10:00:00','2021-06-25 12:00:00','Excel',2);


INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (1,1,1);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (2,1,2);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (3,2,3);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (5,3,4);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (6,3,1);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (7,4,2);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (8,4,3);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (9,5,2);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (10,5,1);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (11,6,3);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (12,6,4);

