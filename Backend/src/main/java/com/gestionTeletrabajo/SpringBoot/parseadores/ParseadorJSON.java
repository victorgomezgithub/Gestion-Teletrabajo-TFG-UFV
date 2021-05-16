package com.gestionTeletrabajo.SpringBoot.parseadores;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gestionTeletrabajo.SpringBoot.models.dao.IPanelDeConfiguracionRepository;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;
import com.gestionTeletrabajo.SpringBoot.models.entity.ReunionEntity;
import com.gestionTeletrabajo.SpringBoot.reuniones.DatosReunion;
import com.google.gson.Gson;

@Component
public class ParseadorJSON {

	@Autowired
	IPanelDeConfiguracionRepository configuracionRepository;
	
	public PanelDeConfiguracionEntity[] parserStringToArrayConfiguracionEntity(String configuraciones) {		
		JSONObject obj;
		try {
			
			obj = new JSONObject(configuraciones);
			String configuracionString = (String) obj.getJSONObject("params").getJSONArray("updates").getJSONObject(0).get("value");		
			Gson gson = new Gson(); 	 
			PanelDeConfiguracionEntity[] configuracionesArray = gson.fromJson(configuracionString, PanelDeConfiguracionEntity[].class);  
			return configuracionesArray;
			
			} catch (JSONException e) {
			e.printStackTrace();
			return null;
		}				
	}
	
	public DatosReunion parserStringToArrayDatosReunion(String parametrosReunion) {		
		JSONObject obj;
		try {
			
			obj = new JSONObject(parametrosReunion);
			String parametrosReunionString = (String) obj.getJSONObject("params").getJSONArray("updates").getJSONObject(0).get("value");
			Gson gson = new Gson(); 	 
			return gson.fromJson(parametrosReunionString, DatosReunion.class);
			} catch (JSONException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	public Long parserStringToIdReunion(String idReunion) {		
		JSONObject obj;
		try {
			
			obj = new JSONObject(idReunion);
			return obj.getJSONObject("params").getJSONArray("updates").getJSONObject(0).getLong("value");
			} catch (JSONException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
}
