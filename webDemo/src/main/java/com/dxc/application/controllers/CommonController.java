package com.dxc.application.controllers;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dxc.application.services.CommonService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/common")
public class CommonController {
	@Autowired
	CommonService commonService;
	
	@GetMapping("/dbservertime")
	@ResponseBody
	public Date home(HttpServletRequest request) throws Exception {
		log.info("DB Server Time request!!");
		return commonService.getDBServerTime();
	}
}
