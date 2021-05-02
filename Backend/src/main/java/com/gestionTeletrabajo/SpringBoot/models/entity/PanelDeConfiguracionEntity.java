package com.gestionTeletrabajo.SpringBoot.models.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity(name="PanelDeConfiguracionEntity")
@Table(name = "DCONFIGURACION")
public class PanelDeConfiguracionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idConfiguracion;
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_empresa_fk", referencedColumnName = "idEmpresa")
	private EmpresaEntity idEmpresaFK;
	
	public Long getIdConfiguracion() {
		return idConfiguracion;
	}

	public void setIdConfiguracion(Long idConfiguracion) {
		this.idConfiguracion = idConfiguracion;
	}
	
	public void setIdConfiguracion(String idConfiguracion) {
		this.idConfiguracion = Long.parseLong(idConfiguracion);
	}


	public EmpresaEntity getIdEmpresaFK() {
		return idEmpresaFK;
	}

	public void setIdEmpresaFK(EmpresaEntity idEmpresaFK) {
		this.idEmpresaFK = idEmpresaFK;
	}

	private String requisito;
	private String parametro;
	private String obligatoriedad;
	
	public PanelDeConfiguracionEntity() {
		
	}

	public PanelDeConfiguracionEntity(EmpresaEntity empresaNueva, String requisito, String parametro, String obligatoriedad) {
		this.idEmpresaFK = empresaNueva;
		this.requisito = requisito;
		this.parametro = parametro;
		this.obligatoriedad = obligatoriedad;
	}

	public String getObligatoriedad() {
		return obligatoriedad;
	}
	
	public void setObligatoriedad(String obligatoriedad) {
		this.obligatoriedad = obligatoriedad;
	}
	
	
	public String getParametro() {
		return parametro;
	}
	
	public void setParametro(String parametro) {
		this.parametro = parametro;
	}

	public String getRequisito() {
		return requisito;
	}

	public void setRequisito(String requisito) {
		this.requisito = requisito;
	}
	
}
