package com.dxc.application.services;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dxc.application.constants.AppConstants;
import com.dxc.application.exceptions.ApplicationException;
import com.dxc.application.model.GimDetail;
import com.dxc.application.model.GimHeader;
import com.dxc.application.mybatis.mapper.GIMMasterMapper;

@Service
public class GimMasterServiceImp implements GimMasterService {

	@Autowired
	GIMMasterMapper gimHeaderMapper;

	@Override
	@Transactional(value="mybastistx",readOnly = true)
	public List<GimHeader> getGimHeader(GimHeader criteria) throws ApplicationException, Exception {
		return gimHeaderMapper.findGimHeader(criteria);
	}
	
	@Override
	@Transactional(value="mybastistx",rollbackFor = Exception.class)
	public int saveGimHeader(GimHeader gimData) throws ApplicationException, Exception {
		if (StringUtils.equalsIgnoreCase(gimData.getMode(), AppConstants.MODE_ADD)) {
			return gimHeaderMapper.saveGimHeader(gimData);
		} else {
			return gimHeaderMapper.updateGimHeader(gimData);
		}
	}
	@Override
	@Transactional(value="mybastistx",readOnly = true)
	public List<GimDetail> getGimDetail(GimDetail criteria) throws ApplicationException, Exception {
		return gimHeaderMapper.findGimDetail(criteria);
	}
	@Override
	@Transactional(value="mybastistx",rollbackFor = Exception.class)
	public int saveGimDetail(GimDetail gimData) throws ApplicationException, Exception {
		if (StringUtils.equalsIgnoreCase(gimData.getMode(), AppConstants.MODE_ADD)) {
			return gimHeaderMapper.saveGimDetail(gimData);
		} else {
			return gimHeaderMapper.updateGimDetail(gimData);
		}
	}
	@Override
	@Transactional(value="mybastistx",rollbackFor = Exception.class)
	public int deleteGimDetail(GimDetail[] gimData) throws ApplicationException, Exception {
		int deleteRowCount = 0;
		for (GimDetail gimDetail : gimData) {
			deleteRowCount += gimHeaderMapper.deleteGimDetailByKeys(gimDetail);
		}
		return deleteRowCount;
	}
}
