package com.dxc.application.services;

import java.util.List;

import com.dxc.application.exceptions.ApplicationException;
import com.dxc.application.model.GimDetail;
import com.dxc.application.model.GimHeader;

public interface GimMasterService {
	List<GimHeader> getGimHeader(GimHeader criteria) throws ApplicationException, Exception;
	int saveGimHeader(GimHeader gimData) throws ApplicationException, Exception;
	List<GimDetail> getGimDetail(GimDetail criteria) throws ApplicationException, Exception;
	int saveGimDetail(GimDetail gimData) throws ApplicationException, Exception;
	int deleteGimDetail(GimDetail[] gimData) throws ApplicationException, Exception;
}