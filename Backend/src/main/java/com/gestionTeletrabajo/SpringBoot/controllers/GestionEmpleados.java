package com.gestionTeletrabajo.SpringBoot.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteDao;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;

@Controller
@RequestMapping(value = "/")
public class GestionEmpleados {

	@Autowired
	private IClienteDao clienteDao;
	
	@GetMapping("/empleados")
	@ResponseBody
	public List<EmpleadoEntity> getEmpleados() {
      return clienteDao.findAll();
	}
	
	@GetMapping("/empleado")
	@ResponseBody
	public EmpleadoEntity createUser(@RequestParam String username) {
      return clienteDao.findOne(username);
	}
}
