package com.dxc.application.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GimDetail {
	private String gimType;
    private String gimCd;
    private String gimValue;
    private String field1;
    private String field2;
    private String field3;
    private String activeFlag;
    private String displayActiveFlag;
    private String mode;
    private String createdBy;
	private Date createdDt;
	private String modifiedBy;
	private Date modifiedDt;
}
