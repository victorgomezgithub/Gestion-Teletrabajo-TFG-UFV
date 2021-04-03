package com.gestionTeletrabajo.SpringBoot.controllers;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IEmpresaRespository;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpresaEntity;

@Controller
@RequestMapping(value = "/empleados")
public class GestionEmpleados {

	@Autowired
	private IClienteRespository clienteDao;
	
	@Autowired
	private IEmpresaRespository empresaDao;
	
	
	@GetMapping("/findAll")
	@ResponseBody
	public List<EmpleadoEntity> getEmpleados() {
      return clienteDao.findAll();
	}
	
	
	@GetMapping("/getEmpleadosEmpresa")
	@ResponseBody
	public List<EmpleadoEntity> getEmpleadosPorEmpresa(@RequestParam String empresa) {
      return clienteDao.findAllByCompany(empresa);
	}
	
	
	@GetMapping("/login")
	@ResponseBody
	public EmpleadoEntity getEmpleado(@RequestParam String username, @RequestParam String password) {
      Optional<EmpleadoEntity> clienteEncontrado =  clienteDao.findOneByUsernameAndPassword(username, password);
      return clienteEncontrado.isPresent()? clienteEncontrado.get() : null; 
	}
	
	
	@PostMapping("/registerEmpleado")
	@ResponseBody
	public ResponseEntity<EmpleadoEntity> registerEmpleado(@RequestParam String username, @RequestParam String password,@RequestParam String rol, @RequestParam String nombreEmpresa) {
		EmpresaEntity empresaNueva = new EmpresaEntity(nombreEmpresa);
		this.empresaDao.save(empresaNueva);
		EmpleadoEntity empleadoRegistrado = new EmpleadoEntity(username,password,rol,empresaNueva);
		this.clienteDao.save(empleadoRegistrado).getId();
		return new ResponseEntity<>(empleadoRegistrado,HttpStatus.OK);
	}
	
	
	
	
}
