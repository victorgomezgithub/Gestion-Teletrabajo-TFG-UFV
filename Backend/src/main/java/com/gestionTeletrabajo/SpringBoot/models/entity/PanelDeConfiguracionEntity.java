package com.gestionTeletrabajo.SpringBoot.models.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="PanelDeConfiguracionEntity")
@Table(name = "DCONFIGURACION")
public class PanelDeConfiguracionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idConfiguracion;
	
}
