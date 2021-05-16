package com.gestionTeletrabajo.SpringBoot.reuniones;

public class MensajesReunion {

	
	private String mensaje;
	private boolean obligatorio;
	
	
	public MensajesReunion(String mensaje, boolean obligatorio) {
		this.mensaje = mensaje;
		this.obligatorio = obligatorio;
	}
	
	public String getMensaje() {
		return mensaje;
	}
	public void setMensaje(String mensaje) {
		this.mensaje = mensaje;
	}
	public boolean getObligatorio() {
		return obligatorio;
	}
	public void setObligatorio(boolean obligatorio) {
		this.obligatorio = obligatorio;
	}
	
}
