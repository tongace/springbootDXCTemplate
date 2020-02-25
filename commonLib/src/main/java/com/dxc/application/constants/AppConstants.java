/******************************************************
 * Program History
 * 
 * Project Name	            :  st3-web-template
 * Client Name				:  TMAP-EM
 * Package Name             :  th.co.toyota.application.constants
 * Program ID 	            :  AppConstants.java
 * Program Description	    :  Application Constants
 * Environment	 	        :  Java 7
 * Author					:  danilo
 * Version					:  1.0
 * Creation Date            :  Feb 28, 2014
 *
 * Modification History	    :
 * Version	   Date		   Person Name		Chng Req No		Remarks
 *
 * Copyright(C) 2015-TOYOTA Motor Asia Pacific. All Rights Reserved.             
 ********************************************************/
package com.dxc.application.constants;

public final class AppConstants {
	private AppConstants() {
	};

	public static final String PROJECT_CD = "projectCode";
	public static final String ACTIVE_FLAG_ACTIVE = "Y";
	public static final String ACTIVE_FLAG_INACTIVE = "N";
	public static final String MODE_VIEW = "VIEW";
	public static final String MODE_EDIT = "EDIT";
	public static final String MODE_ADD = "ADD";
	public static final String MODE_INITIAL = "INITIAL";
	public static final String MODE_SEARCH = "SEARCH";
	public static final String MODE_DELETE = "DELETE";
	public static final String COMBOBOX_ALL = "All";
	public static final String COMBOBOX_SELECT = "Select";
	public static final String REPORT_DOWNLOAD_FOLDER = "report.download.folder";
	public static final String EXCEL_REPORT_TEMPLATE_FOLDER = "excel.report.template.folder";
	public static final String JASPER_REPORT_TEMPLATE_FOLDER = "jasper.report.template.folder";

	public static final String ODB_PARAMETER_END = "END";

	public static final String COMMON_REGEX = "([^,]+)";

	public static final String DATE_FORMAT = "dd/MM/yyyy";
	public static final String DATETIME_FORMAT = "dd/MM/yyyy HH:mm:ss";
	public static final String TIME_FORMAT = "HH:mm:ss";
}