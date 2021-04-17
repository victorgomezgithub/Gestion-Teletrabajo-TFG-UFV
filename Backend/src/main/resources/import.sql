INSERT INTO DEMPRESAS (nombre_empresa) VALUES ('Atmira');

INSERT INTO DEMPLEADOS (username,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('Levi Ackerman','emailInventado@gmail.com','1234','Empleado','09:00:00','17:00:00','1','IT');
INSERT INTO DEMPLEADOS (username,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('Sancho Panza', 'emailInventado@gmail.com','1234','Empleado' ,'09:00:00','17:00:00','1','IT');
INSERT INTO DEMPLEADOS (username,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('Victor Gomez', 'emailInventado@gmail.com','1234','Empleado' ,'09:00:00','17:00:00','1','RH');
INSERT INTO DEMPLEADOS (username,email,password,rol,hora_entrada,hora_salida,id_empresa_fk,equipo) VALUES ('Paco Sanchez', 'emailInventado@gmail.com','1234','Empleado' ,'09:00:00','17:00:00','1','RH');

INSERT INTO DREUNIONES (id_reunion,title,start,end,documento) VALUES (1,'Reunion 1','2021-04-17 08:00:00','2021-04-17 10:00:00','Word');
INSERT INTO DREUNIONES (id_reunion,title,start,end,documento) VALUES (2,'Reunion 2','2021-04-18 08:00:00','2021-04-18 12:00:00','Excel');


INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (1,1,1);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (2,1,2);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (3,2,3);
INSERT INTO DREUNIONESEMPLEADO (id_relacion_reunion, id_reunion_fk,id_empleado_fk) VALUES (4,2,1);

