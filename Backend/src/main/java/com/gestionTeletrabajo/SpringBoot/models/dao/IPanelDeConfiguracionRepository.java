package com.gestionTeletrabajo.SpringBoot.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;

public interface IPanelDeConfiguracionRepository extends JpaRepository<PanelDeConfiguracionEntity, Long> {

    @Query("SELECT P FROM PanelDeConfiguracionEntity P where P.idEmpresaFK = (SELECT EP.idEmpresaFK FROM EmpleadoEntity EP where EP.idEmpleado = ?1)") 
    List<PanelDeConfiguracionEntity> findAllByidEmpleado(Long idEmpleado);
	
	
}
