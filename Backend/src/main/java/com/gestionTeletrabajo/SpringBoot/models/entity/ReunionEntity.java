package com.gestionTeletrabajo.SpringBoot.models.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="ReunionEntity")
@Table(name = "DREUNIONES")
public class ReunionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idReunion;
	
	private String nombreReunion;
	private Date horaInicio;
	private Date horaFin;
	private String documentoAdjunto;
	
	
	 
	public String getNombreReunion() {
		return nombreReunion;
	}
	public void setNombreReunion(String nombreReunion) {
		this.nombreReunion = nombreReunion;
	}
	public Date getHoraInicio() {
		return horaInicio;
	}
	public void setHoraInicio(Date horaInicio) {
		this.horaInicio = horaInicio;
	}
	public Date getHoraFin() {
		return horaFin;
	}
	public void setHoraFin(Date horaFin) {
		this.horaFin = horaFin;
	}
	public String getDocumentoAdjunto() {
		return documentoAdjunto;
	}
	public void setDocumentoAdjunto(String documentoAdjunto) {
		this.documentoAdjunto = documentoAdjunto;
	}
	
	

}