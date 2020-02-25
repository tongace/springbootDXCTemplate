package com.dxc.application.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GimHeader {
	private String gimType;
	private String gimDesc;
	private BigDecimal cdLength;
	private String field1Label;
	private String field2Label;
	private String field3Label;
	private String activeFlag;
	private String createdBy;
	private Date createdDt;
	private String modifiedBy;
	private Date modifiedDt;
	private String displayActiveFlag;
	
	private String mode;
	
	private String[] searchGimTypes;
	private String searchGimDesc;
	private String searchActiveFlag;
}
