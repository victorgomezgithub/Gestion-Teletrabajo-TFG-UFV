package com.gestionTeletrabajo.SpringBoot.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpresaEntity;

@Controller
@RequestMapping(value = "/empresas")
public class GestionEmpresas {

	@Autowired
	private IClienteRespository clienteDao;

	
	@GetMapping("/findEmpresa")
	@ResponseBody
	public EmpresaEntity getEmpleados(String idEmpleado) {
      return clienteDao.getOne(Long.parseLong(idEmpleado)).getIdEmpresaFK();
	}
	
	
	
}
