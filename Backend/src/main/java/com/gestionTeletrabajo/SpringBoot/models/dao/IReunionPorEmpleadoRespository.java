package com.gestionTeletrabajo.SpringBoot.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpresaEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionPorEmpleadoEntity;

public interface IReunionPorEmpleadoRespository extends JpaRepository<ReunionPorEmpleadoEntity, Long> {

	
}
