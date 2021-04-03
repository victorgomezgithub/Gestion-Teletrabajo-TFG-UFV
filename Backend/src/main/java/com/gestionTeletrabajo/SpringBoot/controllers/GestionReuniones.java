package com.gestionTeletrabajo.SpringBoot.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/reuniones")
public class GestionReuniones {

	
	@GetMapping("/findReunionesEmpleado")
	@ResponseBody
	public void getReunionesEmpleado(@RequestParam Long idEmpleado) {
      
	}
	
	
	
}
