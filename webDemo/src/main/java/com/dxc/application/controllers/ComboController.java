package com.dxc.application.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dxc.application.model.Combo;
import com.dxc.application.services.CommonService;

@RestController
@RequestMapping("/combo")
public class ComboController {
	@Autowired
	CommonService commonService;
	
	@GetMapping(value="/gimtypecombo",produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<Combo> getGimTypeCombo() throws Exception {
		return commonService.getGimTypeCombo();
	}
	@GetMapping(value="/activeflagcombo",produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public List<Combo> getActiveFlagCombo() throws Exception {
		return commonService.getActiveFlagCombo();
	}
}
