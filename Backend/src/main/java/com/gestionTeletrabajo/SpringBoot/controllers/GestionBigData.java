package com.gestionTeletrabajo.SpringBoot.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gestionTeletrabajo.SpringBoot.bigData.AnalisisDatos;
import com.gestionTeletrabajo.SpringBoot.models.dao.ICoworkingRepository.ChartCircularEmployee;
import com.gestionTeletrabajo.SpringBoot.models.dao.ICoworkingRepository.ChartCircularObligatoriedad;
import com.gestionTeletrabajo.SpringBoot.models.dao.ICoworkingRepository.ChartDataSets;

@Controller
@RequestMapping(value = "/analisis")
public class GestionBigData {

	
	@Autowired
	private AnalisisDatos analisisDatos;
	
	
	@GetMapping("/findGraficaReusTot")
	@ResponseBody
	public  List<ChartDataSets> getReusTotales() {
      return analisisDatos.getAnalisisDatosReunionesPorMes();
	}
	
	@GetMapping("/findEmpleadosPorReu")
	@ResponseBody
	public  List<ChartCircularEmployee> getEmpleadosPorReu() {
      return analisisDatos.getEmpleadosPorReus();
	}
	
	@GetMapping("/findConfigStats")
	@ResponseBody
	public  List<ChartCircularObligatoriedad> getConfigStats() {
      return analisisDatos.getConfigStats();
	}
}
