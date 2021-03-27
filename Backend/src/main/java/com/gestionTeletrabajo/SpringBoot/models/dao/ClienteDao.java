package com.gestionTeletrabajo.SpringBoot.models.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.gestionTeletrabajo.SpringBoot.models.entity.EmpleadoEntity;

@Repository
public class ClienteDao implements IClienteDao {

	@PersistenceContext
	private EntityManager entityManagerDempleado;
	
	@Override
	@Transactional(readOnly = true)
	public List<EmpleadoEntity> findAll() {
		return entityManagerDempleado.createQuery("from EmpleadoEntity", EmpleadoEntity.class).getResultList();
	}
	
	
	@Override
	@Transactional(readOnly = true)
	public EmpleadoEntity findOne(String username) {
		try {
			return entityManagerDempleado.createQuery("from EmpleadoEntity where name = '" + username + "'", EmpleadoEntity.class).getResultList().get(0);
		} catch (IndexOutOfBoundsException e) {
			return new EmpleadoEntity();
		}
	}

}
