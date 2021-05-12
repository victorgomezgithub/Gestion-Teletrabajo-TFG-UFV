package com.gestionTeletrabajo.SpringBoot.models.entity;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.sun.istack.Nullable;

@Entity(name = "EmpleadoEntity")
@Table(name = "DEMPLEADOS")
public class EmpleadoEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idEmpleado;
	private String nombre;
	private String username;
	private String email;
	private String password;
	private String rol;
	private String equipo;

	@Basic
	private Time horaEntrada;
	@Basic
	private Time horaSalida;

	@Nullable
	private String disponibilidad;

	@ManyToOne
	@JoinColumn(name = "id_empresa_fk", referencedColumnName = "idEmpresa")
	private EmpresaEntity idEmpresaFK;

	public EmpresaEntity getIdEmpresaFK() {
		return idEmpresaFK;
	}

	public void setIdEmpresaFK(EmpresaEntity idEmpresaFK) {
		this.idEmpresaFK = idEmpresaFK;
	}

	public EmpleadoEntity() {	}

	public EmpleadoEntity(String name, String username, String password, String rol, String email, String equipo,
			Time horaEntrada, Time horaSalida, EmpresaEntity empresa) {
		this.nombre = name;
		this.username = username;
		this.password = password;
		this.rol = rol;
		this.email = email;
		this.equipo = equipo;
		this.horaEntrada = horaEntrada;
		this.horaSalida = horaSalida;
		this.idEmpresaFK = empresa;
	}

	public void calculaDisponibilidad(List<ReunionPorEmpleadoEntity> reunionesTotalesEmpleado) {

		Date fechaActual = new Date();

		for (ReunionPorEmpleadoEntity reunionIndividual : reunionesTotalesEmpleado) {

			if (reunionIndividual.getReunion().getStart().before(fechaActual)
					&& reunionIndividual.getReunion().getEnd().after(fechaActual)) {
				this.disponibilidad = "ocupado";
				return;
			}
		}
		
		this.disponibilidad = "disponible";

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

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDisponibilidad() {
		return disponibilidad;
	}

	public void setDisponibilidad(String disponibilidad) {
		this.disponibilidad = disponibilidad;
	}
	
	
}