package com.gestionTeletrabajo.SpringBoot.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gestionTeletrabajo.SpringBoot.models.entity.CoworkingEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.EmpresaEntity;

public interface ICoworkingRepository extends JpaRepository<CoworkingEntity, Long> {

	
    @Query("SELECT C FROM CoworkingEntity C where C.idEmpresaFK = ?1") 
    CoworkingEntity[] findCoworkingPorEmpresa(EmpresaEntity idEmpresaFK);
	
    
    
    @Query(value ="SELECT  DATE_FORMAT(start_date, '%Y') as 'year',"
    		+ "DATE_FORMAT(start_date, '%m') as 'month',"
    		+ "COUNT(id_reunion) as 'total' "
    		+ "FROM DREUNIONES "
    		+ "GROUP BY DATE_FORMAT(start_date, '%Y %m');", nativeQuery = true) 
    List<ChartDataSets> findDataPorMesAno();
	
    public static interface ChartDataSets {

        String getTotal();

        String getMonth();
        
        String getYear();

     }
    
    
    @Query(value ="SELECT count(id_empleado_fk) as integrantes  from DREUNIONESEMPLEADO group by id_reunion_fk;", nativeQuery = true) 
    List<ChartCircularEmployee> findIntegrantesPorReunion();
    
    public static interface ChartCircularEmployee {

        String getIntegrantes();

     }
	
    
    @Query(value ="SELECT count(obligatoriedad) as numero ,obligatoriedad as tipo  from springbootdb.dconfiguracion group by obligatoriedad;", nativeQuery = true) 
    List<ChartCircularObligatoriedad> getConfigStats();
    
    public static interface ChartCircularObligatoriedad {

        String getNumero();
        String getTipo();
        
     }
	
}
