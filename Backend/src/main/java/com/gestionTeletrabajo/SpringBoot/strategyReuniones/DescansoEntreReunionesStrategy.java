 package com.gestionTeletrabajo.SpringBoot.strategyReuniones;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.gestionTeletrabajo.SpringBoot.constantes.Constantes;
import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IReunionPorEmpleadoRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IReunionRespository;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionPorEmpleadoEntity;
import com.gestionTeletrabajo.SpringBoot.reuniones.DatosReunion;
import com.gestionTeletrabajo.SpringBoot.reuniones.MensajesReunion;

@Component
public class DescansoEntreReunionesStrategy implements IReunionStrategy {

	@Autowired
	private IReunionPorEmpleadoRespository reunionEmpleadoRepo;
	@Autowired
	private IReunionRespository reunionRepo;
	@Autowired
	private IClienteRespository clienteRepo;


	@Override
	public boolean isPosibleReunion(DatosReunion datosReunion, PanelDeConfiguracionEntity[] configuracionesEmpresa, List<MensajesReunion> mensajesReunion) {
		boolean isPosibleReunion = true;
		
		for (Long idEmpleado : datosReunion.getIntegrantes()) {
			Optional<EmpleadoEntity> empleado = clienteRepo.findById(idEmpleado);
			if (!empleado.isEmpty()) {
				List<ReunionPorEmpleadoEntity> idReuniones = reunionEmpleadoRepo.findAllReunionesPorIdEmpleado(empleado.get());
				if (!idReuniones.isEmpty()) {
					for (ReunionPorEmpleadoEntity relacionEmpleadoReunion : idReuniones) {
						if(!checkDescancoEntreReunionesRespetado(relacionEmpleadoReunion, datosReunion, configuracionesEmpresa[1].getParametro())) {
							if(configuracionesEmpresa[1].getObligatoriedad().equals(Constantes.Obligatoriedad_Obligatorio)) {
								mensajesReunion.add(new MensajesReunion("Descanso entre reuniones no respetado para " + empleado.get().getNombre(), true));
								isPosibleReunion = false;
								break;
							}
							if(configuracionesEmpresa[1].getObligatoriedad().equals(Constantes.Obligatoriedad_Aviso)) {
								mensajesReunion.add(new MensajesReunion("Descanso entre reuniones recomendado no respetado para " + empleado.get().getNombre(), false));
								break;
							}
						}
					}
				}
			}
		}
		return isPosibleReunion;

	}
	
	private boolean checkDescancoEntreReunionesRespetado(ReunionPorEmpleadoEntity relacionEmpleadoReunion, DatosReunion datosReunion, String parametro) {
		ReunionEntity reunion = reunionRepo.getOne(relacionEmpleadoReunion.getIdReunionFK());
		return checkDescansoPostReunionRespetado(reunion, datosReunion, parametro) && checkDescansoPreReunionRespetado(reunion, datosReunion, parametro);

	}
	
	
	private boolean checkDescansoPreReunionRespetado(ReunionEntity reunion, DatosReunion datosReunion, String parametro) {
		try {
			Date fechaFin = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaFin());
			Date fechaInit = reunion.getStartDate();
			long diffInMillies = Math.abs(fechaInit.getTime() - fechaFin.getTime());
			diffInMillies = TimeUnit.MINUTES.convert(diffInMillies, TimeUnit.MILLISECONDS);
		    
		    
			Date fechaFinit = reunion.getStartDate();
			long diffEndEnd = Math.abs(fechaFinit.getTime() - fechaFin.getTime());
			diffEndEnd = TimeUnit.MINUTES.convert(diffEndEnd, TimeUnit.MILLISECONDS);
		    
		    
		    if ( Long.parseUnsignedLong(parametro) <= diffInMillies && Long.parseUnsignedLong(parametro) <= diffEndEnd) {
		    	return true;
		    }
		    
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	private boolean checkDescansoPostReunionRespetado(ReunionEntity reunion, DatosReunion datosReunion, String parametro) {
		try {
			Date fechaInicio = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaInicio());
			Date fechaFin = reunion.getEndDate();
			long diffInMillies = Math.abs(fechaFin.getTime() - fechaInicio.getTime());
			diffInMillies = TimeUnit.MINUTES.convert(diffInMillies, TimeUnit.MILLISECONDS);
		    
			Date fechaInit = reunion.getStartDate();
			long diffStartStart = Math.abs(fechaInit.getTime() - fechaInicio.getTime());
			diffStartStart = TimeUnit.MINUTES.convert(diffStartStart, TimeUnit.MILLISECONDS);
		    
		    
		    if ( Long.parseUnsignedLong(parametro) < diffInMillies && Long.parseUnsignedLong(parametro) < diffStartStart) {
		    	return true;
		    }
		    
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return false;
	}

}
