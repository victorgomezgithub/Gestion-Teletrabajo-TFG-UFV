package com.gestionTeletrabajo.SpringBoot.models.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionPorEmpleadoEntity;

public interface IReunionPorEmpleadoRespository extends JpaRepository<ReunionPorEmpleadoEntity, Long> {

    @Query("SELECT R FROM ReunionPorEmpleadoEntity R where R.idEmpleadoFK = ?1") 
    List<ReunionPorEmpleadoEntity> findAllReunionesPorIdEmpleado(EmpleadoEntity idEmpleado);
	
    @Transactional
    @Modifying
    @Query("DELETE FROM ReunionPorEmpleadoEntity R where R.idEmpleadoFK = ?1") 
    void deleteAllReunionesPorIdEmpleado(EmpleadoEntity idEmpleado);

}
