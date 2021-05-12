package com.gestionTeletrabajo.SpringBoot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gestionTeletrabajo.SpringBoot.models.dao.IPanelDeConfiguracionRepository;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;
import com.gestionTeletrabajo.SpringBoot.parseadores.ParseadorJSON;

@Controller
@RequestMapping(value = "/configuracion")
public class GestionConfiguracion {

	@Autowired
	private IPanelDeConfiguracionRepository panelDeConfiguracionRepository;
	
	
	@GetMapping("/findConfiguracion")
	@ResponseBody
	public  PanelDeConfiguracionEntity[] getConfiguraciones(@RequestParam long idEmpleado) {
      return panelDeConfiguracionRepository.findAllByidEmpleado(idEmpleado);
	}
	
	
	@PostMapping("/modificacionConfiguracion")
	@ResponseBody
	public PanelDeConfiguracionEntity[] guardarConfiguraciones(@RequestBody  String configuraciones) {
		
	  ParseadorJSON parser = new ParseadorJSON(); 	
	  
	  PanelDeConfiguracionEntity[] configuracionesEntitity = parser.parserStringToArrayConfiguracionEntity(configuraciones);
	  
	  if (configuracionesEntitity != null) {
		  for(PanelDeConfiguracionEntity configuracion: configuracionesEntitity)
		  {
			  if(!configuracion.getObligatoriedad().isEmpty() && !configuracion.getParametro().isEmpty()) {
			  panelDeConfiguracionRepository.save(configuracion);
			  }
		  }
	  }
	  
      return configuracionesEntitity;
	}
	
	
}
