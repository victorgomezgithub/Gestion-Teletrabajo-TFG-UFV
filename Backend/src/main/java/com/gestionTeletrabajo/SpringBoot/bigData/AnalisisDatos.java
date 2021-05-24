package com.gestionTeletrabajo.SpringBoot.bigData;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gestionTeletrabajo.SpringBoot.models.dao.ICoworkingRepository;
import com.gestionTeletrabajo.SpringBoot.models.dao.IPanelDeConfiguracionRepository;
import com.gestionTeletrabajo.SpringBoot.models.dao.ICoworkingRepository.ChartCircularEmployee;
import com.gestionTeletrabajo.SpringBoot.models.dao.ICoworkingRepository.ChartCircularObligatoriedad;
import com.gestionTeletrabajo.SpringBoot.models.dao.ICoworkingRepository.ChartDataSets;

@Component
public class AnalisisDatos {
	
	@Autowired
	private ICoworkingRepository analisisRepo;
	
	public List<ChartDataSets> getAnalisisDatosReunionesPorMes() {
		return analisisRepo.findDataPorMesAno();
	}
	
	public List<ChartCircularEmployee> getEmpleadosPorReus() {
		return analisisRepo.findIntegrantesPorReunion();
	}
	
	public List<ChartCircularObligatoriedad> getConfigStats() {
		return analisisRepo.getConfigStats();
	}
	
	
}
