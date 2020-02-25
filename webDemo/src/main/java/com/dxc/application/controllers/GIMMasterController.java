package com.dxc.application.controllers;

import java.math.BigDecimal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.support.RequestContextUtils;

import com.dxc.application.constants.MessagesConstants;
import com.dxc.application.exceptions.ApplicationException;
import com.dxc.application.model.GimDetail;
import com.dxc.application.model.GimHeader;
import com.dxc.application.model.RestJsonData;
import com.dxc.application.services.GimMasterService;
import com.dxc.application.utils.DXCUtils;
import com.dxc.application.utils.MessageUtil;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/gimmaster")
public class GIMMasterController {

	@Autowired
	GimMasterService gimService;
	@Autowired
	MessageSource messageSource;

	@GetMapping()
	public String initialHTML(Model model) throws Exception {
		return "views/gimmaster.html";
	}

	@GetMapping("/js/gimmaster.js")
	public String initialJS(Model model) {
		return "js/gimmaster.js";
	}

	@RequestMapping(value = "/gimheader", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody RestJsonData<GimHeader> getGimHeader(@RequestBody GimHeader input, HttpServletRequest request) {
		RestJsonData<GimHeader> returnData = new RestJsonData<GimHeader>();
		try {
			log.debug(DXCUtils.toStringUsingJackson(input));
			List<GimHeader> gimList = gimService.getGimHeader(input);
			if (gimList.isEmpty()) {
				returnData.setMessage(messageSource.getMessage(MessagesConstants.ERROR_MESSAGE_DATA_NOT_FOUND, null, RequestContextUtils.getLocale(request)));
			}
			returnData.setDatas(gimList);
		} catch (ApplicationException e) {
			log.error(e.getMessage(),e);
			returnData.setMessage(MessageUtil.getErrorMessage(messageSource, e, request));
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			returnData.setMessage(MessageUtil.getErrorMessage(messageSource, e, request));
		}
		return returnData;
	}

	@JsonView(View.class)
	@RequestMapping(value = "/gimheader", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody RestJsonData<String> saveGimHeader(@RequestBody GimHeader input, HttpServletRequest request) {
		RestJsonData<String> returnData = new RestJsonData<String>();
		try {
			input.setCreatedBy("csamphao");
			input.setModifiedBy("csamphao");
			int saveRowCount = gimService.saveGimHeader(input);
			returnData.setRowCount(new BigDecimal(saveRowCount));
		} catch (ApplicationException e) {
			log.error(e.getMessage(),e);
			returnData.setMessage(MessageUtil.getErrorMessage(messageSource, e, request));
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			returnData.setMessage(MessageUtil.getErrorMessage(messageSource, e, request));
		}
		return returnData;
	}

	@JsonView(View.class)
	@RequestMapping(value = "/gimdetail", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody RestJsonData<GimDetail> getGimDetail(@RequestBody GimDetail input, HttpServletRequest request) {
		RestJsonData<GimDetail> returnData = new RestJsonData<GimDetail>();
		try {
			List<GimDetail> gimDetailList = gimService.getGimDetail(input);
			if (gimDetailList.isEmpty()) {
				returnData.setMessage(messageSource.getMessage(MessagesConstants.ERROR_MESSAGE_DATA_NOT_FOUND, null, RequestContextUtils.getLocale(request)));
			}
			returnData.setDatas(gimDetailList);
		} catch (ApplicationException e) {
			log.error(e.getMessage(),e);
			returnData.setMessage(MessageUtil.getErrorMessage(messageSource, e, request));
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			returnData.setMessage(MessageUtil.getErrorMessage(messageSource, e, request));
		}
		return returnData;
	}

	@JsonView(View.class)
	@RequestMapping(value = "/gimdetail", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody RestJsonData<String> saveGimDetail(@RequestBody GimDetail input, HttpServletRequest request) {
		RestJsonData<String> returnData = new RestJsonData<String>();
		try {
			input.setCreatedBy("csamphao");
			input.setModifiedBy("csamphao");
			int saveRowCount = gimService.saveGimDetail(input);
			returnData.setRowCount(new BigDecimal(saveRowCount));
		} catch (ApplicationException e) {
			log.error(e.getMessage(),e);
			returnData.setMessage(MessageUtil.getErrorMessage(messageSource, e, request));
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			returnData.setMessage(MessageUtil.getErrorMessage(messageSource, e, request));
		}
		return returnData;
	}

	@JsonView(View.class)
	@RequestMapping(value = "/gimdetail", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public @ResponseBody RestJsonData<String> deleteGimDetail(@RequestBody GimDetail[] input, HttpServletRequest request) {
		RestJsonData<String> returnData = new RestJsonData<String>();
		try {
			int deleteRowCount = gimService.deleteGimDetail(input);
			returnData.setRowCount(new BigDecimal(deleteRowCount));
		} catch (ApplicationException e) {
			log.error(e.getMessage(),e);
			returnData.setMessage(MessageUtil.getErrorMessage(messageSource, e, request));
		} catch (Exception e) {
			log.error(e.getMessage(),e);
			returnData.setMessage(MessageUtil.getErrorMessage(messageSource, e, request));
		}
		return returnData;
	}
}
