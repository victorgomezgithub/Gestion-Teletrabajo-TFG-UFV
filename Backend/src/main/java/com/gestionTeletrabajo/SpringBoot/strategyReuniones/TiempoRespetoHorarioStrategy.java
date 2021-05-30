package com.gestionTeletrabajo.SpringBoot.strategyReuniones;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.gestionTeletrabajo.SpringBoot.constantes.Constantes;
import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;
import com.gestionTeletrabajo.SpringBoot.reuniones.DatosReunion;
import com.gestionTeletrabajo.SpringBoot.reuniones.MensajesReunion;

@Component
public class TiempoRespetoHorarioStrategy implements IReunionStrategy {

	@Autowired
	private IClienteRespository clienteRepo;


	@Override
	public boolean isPosibleReunion(DatosReunion datosReunion, PanelDeConfiguracionEntity[] configuracionesEmpresa, List<MensajesReunion> mensajesReunion) {
		boolean hayMensajeObligatorio = true;
			
			;
			try {
				Date fechaInicio = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaInicio());
				Date fechaFin = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaFin());
				
				for(Long idEmpleado: datosReunion.getIntegrantes()) {
					if(isFechaAfterHorario(fechaInicio,clienteRepo.getOne(idEmpleado),Long.parseLong(configuracionesEmpresa[3].getParametro())) || isFechaAfterHorario(fechaFin,clienteRepo.getOne(idEmpleado),Long.parseLong(configuracionesEmpresa[3].getParametro()))) {
					    if (configuracionesEmpresa[3].getObligatoriedad().equals(Constantes.Obligatoriedad_Aviso)) {
					    	mensajesReunion.add(new MensajesReunion("Respeto de horarios recomendados excedidos para " + clienteRepo.getOne(idEmpleado).getNombre(), false));
					    }
					    
					    if (configuracionesEmpresa[3].getObligatoriedad().equals(Constantes.Obligatoriedad_Obligatorio)) {
					    	mensajesReunion.add(new MensajesReunion("Respeto de horarios obligatorios excedidos para " + clienteRepo.getOne(idEmpleado).getNombre(), true));
					    	hayMensajeObligatorio = false;
					    }
					}
				}
			} catch (ParseException e) {
				e.printStackTrace();
			}
			



		return hayMensajeObligatorio;
	}


	private boolean isFechaAfterHorario(Date fechaInicio, EmpleadoEntity empleado, Long parametro) {
		Long minutosEntrada = TimeUnit.MINUTES.convert(empleado.getHoraEntrada().getTime(), TimeUnit.MILLISECONDS);
		Long minutosSalida = TimeUnit.MINUTES.convert(empleado.getHoraSalida().getTime(), TimeUnit.MILLISECONDS);

		Long minutosFinReunion = TimeUnit.MINUTES.convert(fechaInicio.getTime(), TimeUnit.MILLISECONDS);

		if(minutosEntrada + parametro >= minutosFinReunion && minutosSalida - parametro <= minutosFinReunion) {
			return true;
		}
		
		
		return false;
	}
}
