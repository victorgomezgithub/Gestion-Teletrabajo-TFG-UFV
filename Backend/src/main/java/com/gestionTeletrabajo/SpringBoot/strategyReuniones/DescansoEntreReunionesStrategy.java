package com.gestionTeletrabajo.SpringBoot.strategyReuniones;

import java.util.List;

import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionEntity;

public class DescansoEntreReunionesStrategy implements IReunionStrategy{

	@Override
	public void isPosibleReunion(List<String> mensajesAvisosReunion, List<String> mensajesObligatoriosReunion, ReunionEntity reunionTemporal) {
		
	}

}
