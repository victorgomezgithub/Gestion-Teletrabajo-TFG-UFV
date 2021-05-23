package com.gestionTeletrabajo.SpringBoot.models.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity(name = "CoworkingEntity")
@Table(name = "DCOWORKINGS")
public class CoworkingEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCoworking;

	public Long getIdCoworking() {
		return idCoworking;
	}

	public void setIdCoworking(Long idCoworking) {
		this.idCoworking = idCoworking;
	}

	public EmpresaEntity getIdEmpresaFK() {
		return idEmpresaFK;
	}

	public void setIdEmpresaFK(EmpresaEntity idEmpresaFK) {
		this.idEmpresaFK = idEmpresaFK;
	}

	@ManyToOne
	@JoinColumn(name = "id_empresa_fk", referencedColumnName = "idEmpresa")
	private EmpresaEntity idEmpresaFK;
	
	private float ejeX;
	
	private float ejeY;

	private String color;
	
	
	public CoworkingEntity() { }
	
	public CoworkingEntity(float ejeX, float ejeY, String color, EmpresaEntity idEmpresaFk) {
		this.ejeX = ejeX;
		this.ejeY = ejeY;
		this.color = color;
		this.idEmpresaFK = idEmpresaFk;
	}
	
	
	public float getEjeX() {
		return ejeX;
	}

	public void setEjeX(float ejeX) {
		this.ejeX = ejeX;
	}

	public float getEjeY() {
		return ejeY;
	}

	public void setEjeY(float ejeY) {
		this.ejeY = ejeY;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	
	
}
