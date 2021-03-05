package com.gestionTeletrabajo.SpringBoot.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/")
public class GestionEmpleados {

	
	
	@RequestMapping("/addBook")
	@ResponseBody
	public void addEmpleado() {
      
	}
}
