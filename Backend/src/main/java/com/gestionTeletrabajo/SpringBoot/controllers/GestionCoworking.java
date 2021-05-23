package com.gestionTeletrabajo.SpringBoot.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.ICoworkingRepository;
import com.gestionTeletrabajo.SpringBoot.models.entity.CoworkingEntity;

@Controller
@RequestMapping(value = "/coworking")
public class GestionCoworking {
	
	@Autowired
	private IClienteRespository clienteDao;
	
	@Autowired
	private ICoworkingRepository coworkingDao;
	
	@GetMapping("/getCoworkingEmpresa")
	@ResponseBody
	public CoworkingEntity[] getEmpleadosPorEmpresa(@RequestParam String idEmpleado) {	

		return coworkingDao.findCoworkingPorEmpresa(clienteDao.getOne(Long.parseLong(idEmpleado)).getIdEmpresaFK());
	}
	
	
	@DeleteMapping("/deleteCoworking")
	@ResponseBody
	public void deleteCoworking(@RequestParam String idCoworking) {	
		coworkingDao.deleteById(Long.parseLong(idCoworking));
	}
	
	
	@PostMapping("/newCoworking")
	@ResponseBody
	public void newCoworking(@RequestParam String ejeX,@RequestParam String ejeY,@RequestParam String color, @RequestParam String idEmpleado) {	
		CoworkingEntity coworkingEntity = new CoworkingEntity(Float.parseFloat(ejeX),Float.parseFloat(ejeY), color, clienteDao.getOne(Long.parseLong(idEmpleado)).getIdEmpresaFK());
		coworkingDao.save(coworkingEntity);
	}
	
	@PostMapping("/updateCoworking")
	@ResponseBody
	public void updateCoworking(@RequestParam String ejeX,@RequestParam String ejeY,@RequestParam String idCoworking) {	
		CoworkingEntity coworkingEntity = coworkingDao.getOne(Long.parseLong(idCoworking));
		coworkingEntity.setEjeX(Float.parseFloat(ejeX));
		coworkingEntity.setEjeY(Float.parseFloat(ejeY));
		coworkingDao.save(coworkingEntity);
	}
}
