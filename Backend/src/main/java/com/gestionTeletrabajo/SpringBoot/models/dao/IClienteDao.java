package com.gestionTeletrabajo.SpringBoot.models.dao;

import java.util.List;

import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;

public interface IClienteDao {

	List<EmpleadoEntity> findAll();

	EmpleadoEntity findOne(String username);
	
}
