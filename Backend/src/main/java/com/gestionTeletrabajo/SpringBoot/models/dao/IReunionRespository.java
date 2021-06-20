package com.gestionTeletrabajo.SpringBoot.models.dao;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.gestionTeletrabajo.SpringBoot.models.entity.CoworkingEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionEntity;

public interface IReunionRespository extends JpaRepository<ReunionEntity, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE ReunionEntity SET idCoworkingFK = NULL WHERE idCoworkingFK = ?1") 
    void updateWithNullsCoworkingValueInReunion(CoworkingEntity coworkingEntity);
	
	
}
