package com.gestionTeletrabajo.SpringBoot.models.entity;

import java.sql.Time;

import javax.persistence.Basic;
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
	private String email;
	private String password;
	private String rol;
	private String equipo;
    @Basic
    private Time horaEntrada;
    @Basic
    private Time horaSalida;

	
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

	public Time getHoraEntrada() {
		return horaEntrada;
	}

	public void setHoraEntrada(Time horaEntrada) {
		this.horaEntrada = horaEntrada;
	}

	public Time getHoraSalida() {
		return horaSalida;
	}

	public void setHoraSalida(Time horaSalida) {
		this.horaSalida = horaSalida;
	}

	public String getEquipo() {
		return equipo;
	}

	public void setEquipo(String equipo) {
		this.equipo = equipo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}