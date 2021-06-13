package com.gestionTeletrabajo.SpringBoot.models.entity;

import java.sql.Blob;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.sun.istack.Nullable;

@Entity(name="ReunionEntity")
@Table(name = "dreuniones")
public class ReunionEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idReunion;
	
	private String title;
	private String description;
	private Date startDate;
	private Date endDate;
	@Lob
    private String documento;
	
	
	@ManyToOne
	@JoinColumn(name = "id_coworking_fk", referencedColumnName = "idCoworking")
	@Nullable
	private CoworkingEntity idCoworkingFK;
	
	public CoworkingEntity getIdCoworkingFK() {
		return idCoworkingFK;
	}

	public void setIdCoworkingFK(CoworkingEntity idCoworkingFK) {
		this.idCoworkingFK = idCoworkingFK;
	}

	public ReunionEntity() {
		
	}
	
	public ReunionEntity(String title, String description, Date startDate, Date endDate, String documento, CoworkingEntity idCoworkingFK) {
		this.title = title;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.documento = documento;
		this.idCoworkingFK = idCoworkingFK;
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