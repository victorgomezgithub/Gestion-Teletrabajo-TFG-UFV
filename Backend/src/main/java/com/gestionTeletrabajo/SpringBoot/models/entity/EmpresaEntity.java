package com.gestionTeletrabajo.SpringBoot.models.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="EmpresaEntity")
@Table(name = "dempresas")
public class EmpresaEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idEmpresa;
	
	public Long getIdEmpresa() {
		return idEmpresa;
	}


	public void setIdEmpresa(Long idEmpresa) {
		this.idEmpresa = idEmpresa;
	}

	private String nombreEmpresa;

	public EmpresaEntity() {
		
	}
	
	
	public EmpresaEntity(String nombreEmpresa) {
		this.nombreEmpresa = nombreEmpresa;
	}
	
	public String getNombreEmpresa() {
		return nombreEmpresa;
	}

	public void setNombreEmpresa(String nombreEmpresa) {
		this.nombreEmpresa = nombreEmpresa;
	}
	

}