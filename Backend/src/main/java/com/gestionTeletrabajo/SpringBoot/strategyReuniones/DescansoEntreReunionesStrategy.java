package com.gestionTeletrabajo.SpringBoot.strategyReuniones;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.gestionTeletrabajo.SpringBoot.constantes.Constantes;
import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IPanelDeConfiguracionRepository;
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
	@Autowired
	private IPanelDeConfiguracionRepository panelDeConfiguracionRepository;

	@Override
	public boolean isPosibleReunion(DatosReunion datosReunion, PanelDeConfiguracionEntity[] configuracionesEmpresa, List<MensajesReunion> mensajesReunion) {
		boolean noObligatorio = true;
		
		for (Long idEmpleado : datosReunion.getIntegrantes()) {
			Optional<EmpleadoEntity> empleado = clienteRepo.findById(idEmpleado);
			if (!empleado.isEmpty()) {
				List<ReunionPorEmpleadoEntity> idReuniones = reunionEmpleadoRepo.findAllReunionesPorIdEmpleado(empleado.get());
				if (!idReuniones.isEmpty()) {
					for (ReunionPorEmpleadoEntity relacionEmpleadoReunion : idReuniones) {
						if(!checkDescancoEntreReunionesRespetado(relacionEmpleadoReunion, datosReunion, configuracionesEmpresa[1].getParametro())) {
							if(configuracionesEmpresa[0].getObligatoriedad().equals(Constantes.Obligatoriedad_Obligatorio)) {
								mensajesReunion.add(new MensajesReunion("Tiempo no respetado para X", true));
								noObligatorio = false;
							}
							if(configuracionesEmpresa[0].getObligatoriedad().equals(Constantes.Obligatoriedad_Aviso)) {
								mensajesReunion.add(new MensajesReunion("Tiempo no respetado para X", false));
							}
						}
					}
				}
			}
		}
		return noObligatorio;

	}
	
	private boolean checkDescancoEntreReunionesRespetado(ReunionPorEmpleadoEntity relacionEmpleadoReunion, DatosReunion datosReunion, String parametro) {
		ReunionEntity reunion = reunionRepo.getOne(relacionEmpleadoReunion.getIdReunionFK());
		return checkDescansoPostReunionRespetado(reunion, datosReunion, parametro) && checkDescansoPreReunionRespetado(reunion, datosReunion, parametro);

	}
	
	
	private boolean checkDescansoPreReunionRespetado(ReunionEntity reunion, DatosReunion datosReunion, String parametro) {
		try {
			Date fechaInicio = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaFin());
			Date fechaFin = reunion.getStart();
			long diffInMillies = Math.abs(fechaFin.getTime() - fechaInicio.getTime());
		    long diff = TimeUnit.MINUTES.convert(diffInMillies, TimeUnit.MILLISECONDS);
		    
		    if ( Long.parseUnsignedLong(parametro) < diff) {
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
			Date fechaFin = reunion.getEnd();
			long diffInMillies = Math.abs(fechaFin.getTime() - fechaInicio.getTime());
		    long diff = TimeUnit.MINUTES.convert(diffInMillies, TimeUnit.MILLISECONDS);
		    
		    if ( Long.parseUnsignedLong(parametro) < diff) {
		    	return true;
		    }
		    
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return false;
	}

}
