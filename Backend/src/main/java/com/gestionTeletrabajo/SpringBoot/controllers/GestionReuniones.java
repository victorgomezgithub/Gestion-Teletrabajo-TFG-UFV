package com.gestionTeletrabajo.SpringBoot.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IPanelDeConfiguracionRepository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IReunionPorEmpleadoRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IReunionRespository;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionPorEmpleadoEntity;
import com.gestionTeletrabajo.SpringBoot.parseadores.ParseadorJSON;
import com.gestionTeletrabajo.SpringBoot.reuniones.DatosReunion;
import com.gestionTeletrabajo.SpringBoot.reuniones.MensajesReunion;
import com.gestionTeletrabajo.SpringBoot.strategyReuniones.DescansoEntreReunionesStrategy;
import com.gestionTeletrabajo.SpringBoot.strategyReuniones.DuracionMáximaReunionStrategy;
import com.gestionTeletrabajo.SpringBoot.strategyReuniones.IReunionStrategy;
import com.gestionTeletrabajo.SpringBoot.strategyReuniones.MaximoNumeroDeRunionesStrategy;
import com.gestionTeletrabajo.SpringBoot.strategyReuniones.TiempoRespetoHorarioStrategy;

@Controller
@RequestMapping(value = "/reuniones")
public class GestionReuniones {

	@Autowired
	private IReunionPorEmpleadoRespository reunionEmpleadoRepo;
	@Autowired
	private IReunionRespository reunionRepo;
	@Autowired
	private IClienteRespository clienteRepo;
	@Autowired
	private IPanelDeConfiguracionRepository panelDeConfiguracionRepository;
	@Autowired
	private DescansoEntreReunionesStrategy descansoEntreReunionesStrategy;
	@Autowired
	private MaximoNumeroDeRunionesStrategy maximoDeReunionesStrategy;
	@Autowired
	private TiempoRespetoHorarioStrategy tiempoRespetoHorarioStrategy;
	
	@Autowired
	ParseadorJSON parser;
	
	@GetMapping("/findReunionesEmpleado")
	@ResponseBody
	public Object[] getReunionesEmpleado(@RequestParam String idEmpleado) {
		ArrayList<ReunionEntity> reunionesEmpleado = new ArrayList<>();
		Optional<EmpleadoEntity> empleado = clienteRepo.findById(Long.parseLong(idEmpleado));
		if (!empleado.isEmpty()) {
			List<ReunionPorEmpleadoEntity> idReuniones = reunionEmpleadoRepo.findAllReunionesPorIdEmpleado(empleado.get());
			if (!idReuniones.isEmpty()) {
				for (ReunionPorEmpleadoEntity relacionEmpleadoReunion : idReuniones) {
					reunionesEmpleado.add(reunionRepo.getOne(relacionEmpleadoReunion.getIdReunionFK()));
				}
			}
		}
		return reunionesEmpleado.toArray();
	}
	
	
	@PostMapping("/deleteReunion")
	@ResponseBody
	public ReunionEntity deleteReunion(@RequestBody String idReunion) {
		ReunionEntity reunion = reunionRepo.findById(parser.parserStringToIdReunion(idReunion)).get();
		reunionEmpleadoRepo.deleteAllReunionesPorReunionEntity(reunion);
		reunionRepo.delete(reunion);
		return reunion;
	}
	
	
	
	@PostMapping("/nuevaReunion")
	@ResponseBody
	public List<MensajesReunion> crearReunion(@RequestBody  String parametrosReunion) {
	  DatosReunion datosReunion = parser.parserStringToArrayDatosReunion(parametrosReunion);
	  ArrayList<MensajesReunion> mensajesReunion = new ArrayList<>();
	  PanelDeConfiguracionEntity[] configuracionEmpresa = panelDeConfiguracionRepository.findAllByidEmpleado(Long.parseLong(datosReunion.getCreador()));
	  
	  ArrayList<IReunionStrategy> reunionesStrategy = new ArrayList<>();
	  reunionesStrategy.add(descansoEntreReunionesStrategy);
	  reunionesStrategy.add(maximoDeReunionesStrategy);
	  reunionesStrategy.add(tiempoRespetoHorarioStrategy);
	  reunionesStrategy.add(new DuracionMáximaReunionStrategy());
	  boolean hayAvisoObligatorio = false;
	  for(IReunionStrategy estrategiaReunion: reunionesStrategy) {
		  if(!estrategiaReunion.isPosibleReunion(datosReunion, configuracionEmpresa, mensajesReunion)) {
			  hayAvisoObligatorio = true;
		  }
	  }
	  
	 if(!hayAvisoObligatorio) {
		 try {
			ReunionEntity nuevaReunion = new ReunionEntity(datosReunion.getTitle(), datosReunion.getDescription(),  new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaInicio()),  new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(datosReunion.getFechaFin()), datosReunion.getFiles().toString());
			reunionRepo.save(nuevaReunion);
			
			for(Long idEmpleado: datosReunion.getIntegrantes()) {
				reunionEmpleadoRepo.save(new ReunionPorEmpleadoEntity(nuevaReunion, clienteRepo.getOne(idEmpleado)));
			}
		 } catch (ParseException e) {
			e.printStackTrace();
		}
	 }
	  
      return mensajesReunion;
	}

}
