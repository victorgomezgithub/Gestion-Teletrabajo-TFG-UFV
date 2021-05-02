package com.gestionTeletrabajo.SpringBoot.controllers;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IEmpresaRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IPanelDeConfiguracionRepository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IReunionPorEmpleadoRespository;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpresaEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;

@Controller
@RequestMapping(value = "/empleados")
public class GestionEmpleados {

	@Autowired
	private IClienteRespository clienteDao;
	
	@Autowired
	private IEmpresaRespository empresaDao;
	
	@Autowired
	private IPanelDeConfiguracionRepository panelDeConfiguracionRepository;
	
	@Autowired
	private IClienteRespository empleados;
	
	
	@Autowired
	private IReunionPorEmpleadoRespository reunionesEmpleado;
	
	@GetMapping("/findAll")
	@ResponseBody
	public List<EmpleadoEntity> getEmpleados() {
      return clienteDao.findAll();
	}
	
	
	@GetMapping("/getEmpleadosEmpresa")
	@ResponseBody
	public List<EmpleadoEntity> getEmpleadosPorEmpresa(@RequestParam String idEmpleado) {
	  
		List<EmpleadoEntity> empleadosEmpresa = clienteDao.findAllByCompany(Long.parseLong(idEmpleado));
		
		for(EmpleadoEntity empleado: empleadosEmpresa) {
			empleado.calculaDisponibilidad(reunionesEmpleado.findAllReunionesPorIdEmpleado(empleado));
			empleados.save(empleado);	
		}
		return empleadosEmpresa;
	}
	
	
	@GetMapping("/login")
	@ResponseBody
	public EmpleadoEntity getEmpleado(@RequestParam String username, @RequestParam String password) {
      Optional<EmpleadoEntity> clienteEncontrado =  clienteDao.findOneByUsernameAndPassword(username, password);
      return clienteEncontrado.isPresent()? clienteEncontrado.get() : null; 
	}
	
	
	@PostMapping("/registerEmpleado")
	@ResponseBody
	public ResponseEntity<EmpleadoEntity> registerEmpleado(@RequestParam String nombre,@RequestParam String username, @RequestParam String password,@RequestParam String rol,@RequestParam String email,@RequestParam String equipo, @RequestParam String nombreEmpresa,@RequestParam String horaEntrada,@RequestParam String horaSalida) {
		EmpresaEntity empresaNueva = generaNuevaEmpresa(nombreEmpresa);
		
		generaPanelDeConfiguracion(empresaNueva);
		
		
		SimpleDateFormat sdf = new SimpleDateFormat("hh:mm");
		 
		EmpleadoEntity empleadoRegistrado;
		try {
			empleadoRegistrado = new EmpleadoEntity(nombre,username,password,rol,email,equipo,new Time(sdf.parse(horaEntrada).getTime()),new Time(sdf.parse(horaSalida).getTime()),empresaNueva);
			this.clienteDao.save(empleadoRegistrado).getId();
			return new ResponseEntity<>(empleadoRegistrado,HttpStatus.OK);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return null;

	}


	private EmpresaEntity generaNuevaEmpresa(String nombreEmpresa) {
		EmpresaEntity empresaNueva = new EmpresaEntity(nombreEmpresa);
		this.empresaDao.save(empresaNueva);
		return empresaNueva;
	}
	
	
	private void generaPanelDeConfiguracion(EmpresaEntity empresaNueva) {
		panelDeConfiguracionRepository.save(new PanelDeConfiguracionEntity(empresaNueva,"Duración máxima de las reuniones","60","Aviso"));
		panelDeConfiguracionRepository.save(new PanelDeConfiguracionEntity(empresaNueva,"Descanso entre reuniones","15","Aviso"));
	}


	@PostMapping("/anadirUsuario")
	@ResponseBody
	public ResponseEntity<EmpleadoEntity> anadirUsuario(@RequestParam String idEmpleado,@RequestParam String nombre,@RequestParam String username, @RequestParam String password,@RequestParam String rol,@RequestParam String email,@RequestParam String equipo,@RequestParam String horaEntrada,@RequestParam String horaSalida) {
		
		EmpresaEntity empresa = this.empresaDao.findEmpresaPorIdEmpleado(Long.parseLong(idEmpleado));
		
		SimpleDateFormat sdf = new SimpleDateFormat("hh:mm");
		 
		EmpleadoEntity empleadoRegistrado;
		try {
			empleadoRegistrado = new EmpleadoEntity(nombre,username,password,rol,email,equipo,new Time(sdf.parse(horaEntrada).getTime()),new Time(sdf.parse(horaSalida).getTime()),empresa);
			this.clienteDao.save(empleadoRegistrado).getId();
			return new ResponseEntity<>(empleadoRegistrado,HttpStatus.OK);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		return null;

	}
	
	
	
}
