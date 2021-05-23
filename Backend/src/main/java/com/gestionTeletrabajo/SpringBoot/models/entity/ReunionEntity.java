package com.gestionTeletrabajo.SpringBoot.models.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity(name="ReunionEntity")
@Table(name = "DREUNIONES")
public class ReunionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idReunion;
	
	private String title;
	private String description;
	private Date startDate;
	private Date endDate;
	private String documento;
	
	public ReunionEntity() {
		
	}
	
	public ReunionEntity(String title, String description, Date startDate, Date endDate, String documento) {
		this.title = title;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.documento = documento;
	}
	
	public Long getIdReunion() {
		return idReunion;
	}
	
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDocumento() {
		return documento;
	}
	public void setDocumento(String documento) {
		this.documento = documento;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	

}