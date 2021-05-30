package com.gestionTeletrabajo.SpringBoot.strategyReuniones;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.gestionTeletrabajo.SpringBoot.constantes.Constantes;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;
import com.gestionTeletrabajo.SpringBoot.reuniones.DatosReunion;
import com.gestionTeletrabajo.SpringBoot.reuniones.MensajesReunion;

public class DuracionMáximaReunionStrategy implements IReunionStrategy {

	@Override
	public boolean isPosibleReunion(DatosReunion datosReunion, PanelDeConfiguracionEntity[] configuracionesEmpresa, List<MensajesReunion> mensajesReunion) {
		
		
		try {
			Date fechaInicio = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaInicio());
			Date fechaFin = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaFin());
			long diffInMillies = Math.abs(fechaFin.getTime() - fechaInicio.getTime());
		    long diff = TimeUnit.MINUTES.convert(diffInMillies, TimeUnit.MILLISECONDS);
			
			
		    if (configuracionesEmpresa[0].getObligatoriedad().equals(Constantes.Obligatoriedad_Aviso) && Long.parseUnsignedLong(configuracionesEmpresa[0].getParametro()) < diff) {
		    	mensajesReunion.add(new MensajesReunion("Tiempo máximo de la Reunión Excedido", false));
		    	return false;
		    }
		    
		    if (configuracionesEmpresa[0].getObligatoriedad().equals(Constantes.Obligatoriedad_Obligatorio) && Long.parseUnsignedLong(configuracionesEmpresa[0].getParametro()) < diff) {
		    	mensajesReunion.add(new MensajesReunion("Tiempo máximo recomendado de la Reunión Excedido", true));
		    	return true;
		    }
		    
		} catch (ParseException e) {
			e.printStackTrace();
		}


		
		return true;
	}

	
	
	
	
}
