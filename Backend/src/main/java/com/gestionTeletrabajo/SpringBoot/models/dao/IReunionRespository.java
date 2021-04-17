package com.gestionTeletrabajo.SpringBoot.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionEntity;

public interface IReunionRespository extends JpaRepository<ReunionEntity, Long> {

    
}
