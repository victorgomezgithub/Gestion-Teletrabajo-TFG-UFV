package com.gestionTeletrabajo.SpringBoot.strategyReuniones;

import java.sql.Time;
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
			
			try {
				Date fechaInicio = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaInicio());
				Date fechaFin = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaFin());
				
				for(Long idEmpleado: datosReunion.getIntegrantes()) {
					if(isFechaBeforeHorario(fechaInicio, fechaFin,clienteRepo.getOne(idEmpleado).getHoraEntrada(),Long.parseLong(configuracionesEmpresa[3].getParametro())) || isFechaAfterHorario(fechaInicio,fechaFin,clienteRepo.getOne(idEmpleado).getHoraSalida(),Long.parseLong(configuracionesEmpresa[3].getParametro()))) {
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


	@SuppressWarnings("deprecation")
	private boolean isFechaBeforeHorario(Date fechaInicio, Date fechaSalida, Time tiempoEmpleado, Long parametro) {
		Long minutosEntrada = TimeUnit.MINUTES.convert(tiempoEmpleado.getTime(), TimeUnit.MILLISECONDS);

		Long minutosInicioReunion = TimeUnit.MINUTES.convert(new Time(fechaInicio.getHours(), fechaInicio.getMinutes(), fechaInicio.getSeconds()).getTime(), TimeUnit.MILLISECONDS);
		Long minutosFinReunion = TimeUnit.MINUTES.convert(new Time(fechaSalida.getHours(), fechaInicio.getMinutes(), fechaInicio.getSeconds()).getTime(), TimeUnit.MILLISECONDS);

		return minutosEntrada - parametro > minutosInicioReunion || minutosEntrada - parametro > minutosFinReunion;	

	}
	
	@SuppressWarnings("deprecation")
	private boolean isFechaAfterHorario(Date fechaInicio, Date fechaSalida, Time tiempoEmpleado, Long parametro) {
		Long minutosEntrada = TimeUnit.MINUTES.convert(tiempoEmpleado.getTime(), TimeUnit.MILLISECONDS);

		Long minutosInicioReunion = TimeUnit.MINUTES.convert(new Time(fechaInicio.getHours(), fechaInicio.getMinutes(), fechaInicio.getSeconds()).getTime(), TimeUnit.MILLISECONDS);
		Long minutosFinReunion = TimeUnit.MINUTES.convert(new Time(fechaSalida.getHours(), fechaInicio.getMinutes(), fechaInicio.getSeconds()).getTime(), TimeUnit.MILLISECONDS);

		return minutosEntrada + parametro < minutosInicioReunion || minutosEntrada + parametro < minutosFinReunion;	

	}
}
