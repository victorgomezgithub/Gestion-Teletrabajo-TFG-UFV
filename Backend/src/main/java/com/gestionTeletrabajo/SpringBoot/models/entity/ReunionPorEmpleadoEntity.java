package com.gestionTeletrabajo.SpringBoot.models.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity(name="ReunionPorEmpleadoEntity")
@Table(name = "DREUNIONESEMPLEADO")
public class ReunionPorEmpleadoEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idRelacionReunion;
	

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_reunion_fk", referencedColumnName = "idReunion")
    private ReunionEntity idReunionFK;
	
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_empleado_fk", referencedColumnName = "idEmpleado")
    private EmpleadoEntity idEmpleadoFK;
	
    public ReunionPorEmpleadoEntity() {
    	
    }
    
    public ReunionPorEmpleadoEntity(ReunionEntity idReunionFK,  EmpleadoEntity idEmpleadoFK) {
    	this.idReunionFK = idReunionFK;
    	this.idEmpleadoFK = idEmpleadoFK;
    }
    
    public Long getIdReunionFK() {
    	return idReunionFK.getIdReunion();
    }
    
    public ReunionEntity getReunion() {
    	return idReunionFK;
    }
    
    public Long getIdEmpleadoFk() {
    	return idEmpleadoFK.getId();
    }

}