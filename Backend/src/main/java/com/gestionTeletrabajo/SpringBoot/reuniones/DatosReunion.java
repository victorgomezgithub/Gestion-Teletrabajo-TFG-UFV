package com.gestionTeletrabajo.SpringBoot.reuniones;

public class DatosReunion {
	
	private String creador;
	private String title;
	private String description;
	private String fechaInicio;
	private String fechaFin;
	private String[] file;
	private Long[] integrantes;
	private Long idCoworking;

	public String getCreador() {
		return creador;
	}
	public void setCreador(String creador) {
		this.creador = creador;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getFechaInicio() {
		return fechaInicio;
	}
	public void setFechaInicio(String fechaInicio) {
		this.fechaInicio = fechaInicio;
	}
	public String getFechaFin() {
		return fechaFin;
	}
	public void setFechaFin(String fechaFin) {
		this.fechaFin = fechaFin;
	}
	public String[] getFile() {
		return file;
	}
	public void setFile(String[] file) {
		this.file = file;
	}
	public Long[] getIntegrantes() {
		return integrantes;
	}
	public void setIntegrantes(Long[] integrantes) {
		this.integrantes = integrantes;
	}
	public Long getIdCoworking() {
		return idCoworking;
	}
	public void setIdCoworking(Long idCoworking) {
		this.idCoworking = idCoworking;
	}


	
	
}
