package com.gestionTeletrabajo.SpringBoot.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gestionTeletrabajo.SpringBoot.models.entity.EmpresaEntity;

public interface IEmpresaRespository extends JpaRepository<EmpresaEntity, Long> {

    @Query("SELECT E FROM EmpresaEntity E where E.idEmpresa = (SELECT EM.idEmpresaFK FROM EmpleadoEntity EM WHERE EM.idEmpleado = ?1)") 
    EmpresaEntity findEmpresaPorIdEmpleado(Long idEmpleado);
	
	
}
