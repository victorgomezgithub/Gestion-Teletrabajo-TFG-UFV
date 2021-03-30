package com.gestionTeletrabajo.SpringBoot.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpresaEntity;

public interface IEmpresaRespository extends JpaRepository<EmpresaEntity, Long> {

	
}
