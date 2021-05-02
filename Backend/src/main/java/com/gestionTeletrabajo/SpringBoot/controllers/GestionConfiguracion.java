package com.gestionTeletrabajo.SpringBoot.controllers;

import java.util.List;
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
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpresaEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;

@Controller
@RequestMapping(value = "/configuracion")
public class GestionConfiguracion {

	@Autowired
	private IPanelDeConfiguracionRepository panelDeConfiguracionRepository;
	
	
	@GetMapping("/findConfiguracion")
	@ResponseBody
	public List<PanelDeConfiguracionEntity> getConfiguraciones(@RequestParam long idEmpleado) {
      return panelDeConfiguracionRepository.findAllByidEmpleado(idEmpleado);
	}
	
	
	@PostMapping("/modificacionConfiguracion")
	@ResponseBody
	public List<PanelDeConfiguracionEntity> getEmpleados(@RequestParam  List<PanelDeConfiguracionEntity> configuraciones) {
		
	  
	  for(PanelDeConfiguracionEntity configuracion: configuraciones) {	  
		  panelDeConfiguracionRepository.save(configuracion);
	  }
	  
      return configuraciones;
	}
	
	
}
