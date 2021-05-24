package com.gestionTeletrabajo.SpringBoot.models.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;

public interface IClienteRespository extends JpaRepository<EmpleadoEntity, Long> {

	
    @Query("SELECT E FROM EmpleadoEntity E where E.username = ?1 and E.password = ?2") 
    Optional<EmpleadoEntity> findOneByUsernameAndPassword(String username, String password);
	
    
    
    @Query("SELECT E FROM EmpleadoEntity E where E.idEmpresaFK = (SELECT EP.idEmpresaFK FROM EmpleadoEntity EP where EP.idEmpleado = ?1) AND E.idEmpleado != ?1") 
    List<EmpleadoEntity> findAllByCompany(Long idEmpleado);
	
}
