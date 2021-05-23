package com.gestionTeletrabajo.SpringBoot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gestionTeletrabajo.SpringBoot.bigData.AnalisisDatos;
import com.gestionTeletrabajo.SpringBoot.bigData.ChartDataSets;

@Controller
@RequestMapping(value = "/analisis")
public class GestionBigData {

	
	@Autowired
	private AnalisisDatos analisisDatos;
	
	
	@GetMapping("/findGraficaReusTot")
	@ResponseBody
	public  ChartDataSets[] getConfiguraciones() {
      return analisisDatos.getAnalisisDatosReunionesPorMes();
	}
	
	
}
