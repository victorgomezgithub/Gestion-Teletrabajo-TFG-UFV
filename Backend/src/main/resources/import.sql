INSERT INTO DEMPRESAS (id_empresa,nombre_empresa) VALUES (1,'Atmira');


INSERT INTO DCONFIGURACION (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (1,1,'Duración máxima de las reuniones','60','Aviso');
INSERT INTO DCONFIGURACION (id_configuracion, id_empresa_fk, requisito, parametro, obligatoriedad) VALUES (2,1,'Descanso entre reuniones','30','Aviso');

INSERT INTO DEMPLEADOS (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user1','Levi Ackerman','emailInventado@gmail.com','1234','Empleado','09:00','17:00','1','IT');
INSERT INTO DEMPLEADOS (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user2','Sancho Panza', 'emailInventado@gmail.com','1234','Empleado' ,'09:00','17:00','1','IT');
INSERT INTO DEMPLEADOS (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user3','Victor Gomez', 'emailInventado@gmail.com','1234','Empleado' ,'09:00','17:00','1','RH');
INSERT INTO DEMPLEADOS (username,nombre,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('user4','Paco Sanchez', 'emailInventado@gmail.com','1234','Empleado' ,'09:00','17:00','1','RH');

INSERT INTO DREUNIONES (id_reunion,title,description,start,end,documento) VALUES (1,'Reunion 1','Descripcion reunion 1','2021-05-19 18:00:00','2021-05-19 10:00:00','Word');
INSERT INTO DREUNIONES (id_reunion,title,description,start,end,documento) VALUES (2,'Reunion 2','Descripcion reunion 2','2021-05-24 18:00:00','2021-05-25 10:00:00','Excel');


INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (1,1,1);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (2,1,2);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (3,2,3);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (4,2,1);

