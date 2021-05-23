package com.gestionTeletrabajo.SpringBoot.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gestionTeletrabajo.SpringBoot.bigData.ChartDataSets;
import com.gestionTeletrabajo.SpringBoot.models.entity.CoworkingEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpresaEntity;

public interface ICoworkingRepository extends JpaRepository<CoworkingEntity, Long> {

	
    @Query("SELECT C FROM CoworkingEntity C where C.idEmpresaFK = ?1") 
    CoworkingEntity[] findCoworkingPorEmpresa(EmpresaEntity idEmpresaFK);
	
	
    @Query(value ="SELECT DATE_FORMAT(start_date, '%Y') as 'year',"
    		+ "DATE_FORMAT(start_date, '%m') as 'month',"
    		+ "COUNT(id_reunion) as 'total'"
    		+ "FROM CoworkingEntity C"
    		+ "GROUP BY DATE_FORMAT(start_date, '%Y%m')", nativeQuery = true) 
    ChartDataSets[] findCoworkingPorMesAno();
	
	
}
