package com.gestionTeletrabajo.SpringBoot.bigData;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gestionTeletrabajo.SpringBoot.models.dao.IClienteRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.ICoworkingRepository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IReunionPorEmpleadoRespository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IReunionRespository;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionEntity;

@Component
public class AnalisisDatos {
	
	@Autowired
	private IReunionPorEmpleadoRespository reunionEmpleadoRepo;
	@Autowired
	private IReunionRespository reunionRepo;
	@Autowired
	private IClienteRespository clienteRepo;

	@Autowired
	private ICoworkingRepository coworkingRepo;
	
	
	public ChartDataSets[] getAnalisisDatosReunionesPorMes() {
		return coworkingRepo.findCoworkingPorMesAno();
	}
	
}
