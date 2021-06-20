package com.gestionTeletrabajo.SpringBoot.strategyReuniones;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.gestionTeletrabajo.SpringBoot.constantes.Constantes;
import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IReunionPorEmpleadoRespository;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;
import com.gestionTeletrabajo.SpringBoot.reuniones.DatosReunion;
import com.gestionTeletrabajo.SpringBoot.reuniones.MensajesReunion;

@Component
public class MaximoNumeroDeRunionesStrategy implements IReunionStrategy {

	@Autowired
	private IReunionPorEmpleadoRespository reunionEmpleadoRepo;
	@Autowired
	private IClienteRespository clienteRepo;


	@Override
	public boolean isPosibleReunion(DatosReunion datosReunion, PanelDeConfiguracionEntity[] configuracionesEmpresa, List<MensajesReunion> mensajesReunion) {
		boolean hayMensajeObligatorio = true;
		for(Long idEmpleado: datosReunion.getIntegrantes()) {
				if(isSizeMenorReunionesEnDiaReunion(configuracionesEmpresa, idEmpleado, datosReunion.getFechaFin()) && isSizeMenorReunionesEnDiaReunion(configuracionesEmpresa, idEmpleado, datosReunion.getFechaInicio())) {
				    if (configuracionesEmpresa[2].getObligatoriedad().equals(Constantes.Obligatoriedad_Aviso)) {
				    	mensajesReunion.add(new MensajesReunion("Máximo número de reuniones recomendadas excedidas para " + clienteRepo.getOne(idEmpleado).getNombre(), false));
				    }
				    
				    if (configuracionesEmpresa[2].getObligatoriedad().equals(Constantes.Obligatoriedad_Obligatorio)) {
				    	mensajesReunion.add(new MensajesReunion("Máximo número de reuniones obligatorias excedidas para " + clienteRepo.getOne(idEmpleado).getNombre(), true));
				    	hayMensajeObligatorio = false;
				    }
				}

		}
		
		return hayMensajeObligatorio;

	}


	private boolean isSizeMenorReunionesEnDiaReunion(PanelDeConfiguracionEntity[] configuracionesEmpresa, Long idEmpleado, String date) {
		
		return reunionEmpleadoRepo.findAllReunionesPorIdEmpleado(clienteRepo.getOne(idEmpleado), date).size() >= Long.parseLong(configuracionesEmpresa[2].getParametro());
	}

}
