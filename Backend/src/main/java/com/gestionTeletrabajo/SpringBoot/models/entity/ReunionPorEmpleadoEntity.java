package com.gestionTeletrabajo.SpringBoot.models.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity(name="ReunionPorEmpleadoEntity")
@Table(name = "DREUNIONESEMPLEADO")
public class ReunionPorEmpleadoEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long relacionReunion;
	

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_reunion_fk", referencedColumnName = "idReunion")
    private ReunionEntity idReunionFK;
	
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_empleado_fk", referencedColumnName = "idEmpleado")
    private EmpleadoEntity idEmpleadoFK;
	

}