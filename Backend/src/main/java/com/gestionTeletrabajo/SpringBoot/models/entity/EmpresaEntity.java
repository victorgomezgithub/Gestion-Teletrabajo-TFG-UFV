package com.gestionTeletrabajo.SpringBoot.models.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="EmpresaEntity")
@Table(name = "DEMPRESAS")
public class EmpresaEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idEmpresa;
	
	private String nombreEmpresa;

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