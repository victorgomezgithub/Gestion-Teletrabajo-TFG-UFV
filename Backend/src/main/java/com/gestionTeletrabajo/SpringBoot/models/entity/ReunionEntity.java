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
	private Date start;
	private Date end;
	private String documento;
	
	public ReunionEntity() {
		
	}
	
	public ReunionEntity(String title, String description, Date start, Date end, String documento) {
		this.title = title;
		this.description = description;
		this.start = start;
		this.end = end;
		this.documento = documento;
	}
	
	public Long getIdReunion() {
		return idReunion;
	}
	
	public Date getEnd() {
		return end;
	}
	public void setEnd(Date end) {
		this.end = end;
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
	public Date getStart() {
		return start;
	}
	public void setStart(Date start) {
		this.start = start;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	

}