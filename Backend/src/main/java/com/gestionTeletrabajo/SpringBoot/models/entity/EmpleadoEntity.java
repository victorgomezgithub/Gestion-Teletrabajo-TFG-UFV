package com.gestionTeletrabajo.SpringBoot.models.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity(name="EmpleadoEntity")
@Table(name = "DEMPLEADOS")
public class EmpleadoEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idEmpleado;
	
	private String username;
	private String password;
	private String rol;
	
	
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_empresa_fk", referencedColumnName = "idEmpresa")
    private EmpresaEntity idEmpresaFK;
	
    
    public EmpleadoEntity() {
    	
    }
    
	public EmpleadoEntity(String username, String password, String rol, EmpresaEntity empresa) {
		this.username = username;
		this.password = password;
		this.rol = rol;
		this.idEmpresaFK = empresa;
	}

	public Long getId() {
		return idEmpleado;
	}

	public void setId(Long id) {
		this.idEmpleado = id;
	}

	public String getUsername() {
		return username;
	}

	public void setName(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}
}