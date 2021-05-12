package com.gestionTeletrabajo.SpringBoot.parseadores;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gestionTeletrabajo.SpringBoot.models.dao.IPanelDeConfiguracionRepository;
import com.gestionTeletrabajo.SpringBoot.models.entity.PanelDeConfiguracionEntity;
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
	
	
}
