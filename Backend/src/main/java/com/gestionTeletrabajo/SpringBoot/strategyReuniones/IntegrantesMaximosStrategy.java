package com.gestionTeletrabajo.SpringBoot.strategyReuniones;

import java.util.List;

import com.gestionTeletrabajo.SpringBoot.constantes.Constantes;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;
import com.gestionTeletrabajo.SpringBoot.reuniones.DatosReunion;
import com.gestionTeletrabajo.SpringBoot.reuniones.MensajesReunion;

public class IntegrantesMaximosStrategy implements IReunionStrategy{

	@Override
	public boolean isPosibleReunion(DatosReunion datosReunion, PanelDeConfiguracionEntity[] configuracionesEmpresa,
			List<MensajesReunion> mensajesReunion) {
		
		if(datosReunion.getIntegrantes().length > Long.parseLong(configuracionesEmpresa[4].getParametro()) && configuracionesEmpresa[4].getObligatoriedad().equals(Constantes.Obligatoriedad_Obligatorio)) {
	    	mensajesReunion.add(new MensajesReunion("Máximo de integrantes excedido", true));
	    	return false;
		}
		if(datosReunion.getIntegrantes().length > Long.parseLong(configuracionesEmpresa[4].getParametro()) && configuracionesEmpresa[4].getObligatoriedad().equals(Constantes.Obligatoriedad_Aviso)) {
	    	mensajesReunion.add(new MensajesReunion("Máximo de integrantes recomendados excedidos", false));
	    	return true;
		}
		
		return true;
	}

}
