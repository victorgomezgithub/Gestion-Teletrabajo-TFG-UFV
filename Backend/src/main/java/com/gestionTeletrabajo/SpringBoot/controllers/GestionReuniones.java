package com.gestionTeletrabajo.SpringBoot.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IReunionPorEmpleadoRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IReunionRespository;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionPorEmpleadoEntity;

@Controller
@RequestMapping(value = "/reuniones")
public class GestionReuniones {

	@Autowired
	private IReunionPorEmpleadoRespository reunionEmpleadoRepo;
	@Autowired
	private IReunionRespository reunionRepo;
	@Autowired
	private IClienteRespository clienteRepo;
	
	@GetMapping("/findReunionesEmpleado")
	@ResponseBody
	public List<ReunionEntity> getReunionesEmpleado(@RequestParam String idEmpleado) {
		ArrayList<ReunionEntity> reunionesEmpleado = new ArrayList<>();
		Optional<EmpleadoEntity> empleado = clienteRepo.findById(Long.parseLong(idEmpleado));
		if( empleado != null && !empleado.isEmpty()) {
		Optional<ReunionPorEmpleadoEntity[]> idReuniones = reunionEmpleadoRepo.findAllReunionesPorIdEmpleado(empleado.get());
		if (!idReuniones.isEmpty()) {
			for (ReunionPorEmpleadoEntity relacionEmpleadoReunion : idReuniones.get()) {
				reunionesEmpleado.add(reunionRepo.getOne(relacionEmpleadoReunion.getIdReunionFK()));
			}
		}
		
		}
		
		return reunionesEmpleado;

	}

}
