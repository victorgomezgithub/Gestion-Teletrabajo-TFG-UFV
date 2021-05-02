package com.gestionTeletrabajo.SpringBoot.strategyReuniones;

import java.util.List;
import java.util.concurrent.TimeUnit;

import com.gestionTeletrabajo.SpringBoot.constantes.Constantes;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionEntity;

public class DuracionMáximaReunionStrategy implements IReunionStrategy {

	private String parametro;
	private String obligatoriedad;
	
	
	public String getParametro() {
		return parametro;
	}


	public void setParametro(String parametro) {
		this.parametro = parametro;
	}


	public String getObligatoriedad() {
		return obligatoriedad;
	}


	public void setObligatoriedad(String obligatoriedad) {
		this.obligatoriedad = obligatoriedad;
	}


	@Override
	public void isPosibleReunion(List<String> mensajesAvisosReunion,List<String> mensajesObligatoriosReunion, ReunionEntity reunionTemporal) {
		
		long diffInMillies = Math.abs(reunionTemporal.getEnd().getTime() - reunionTemporal.getStart().getTime());
	    long diff = TimeUnit.MINUTES.convert(diffInMillies, TimeUnit.MILLISECONDS);
		
		
	    if (obligatoriedad.equals(Constantes.Obligatoriedad_Aviso) && Long.parseUnsignedLong(parametro) < diff) {
	    	mensajesAvisosReunion.add("Tiempo máximo de la Reunión Excedido");
	    }
	    
	    if (obligatoriedad.equals(Constantes.Obligatoriedad_Obligatorio) && Long.parseUnsignedLong(parametro) < diff) {
	    	mensajesObligatoriosReunion.add("Tiempo máximo de la Reunión Excedido");
	    }
	}

	
	
	
	
}
