/**
 * 
 */
package com.dxc.application.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dxc.application.constants.AppConstants;
import com.dxc.application.model.Combo;
import com.dxc.application.mybatis.mapper.CommonMapper;
@Service
public class CommonServiceImp implements CommonService {
	
	@Autowired
	CommonMapper commonMapper;
	
	@Override
	@Transactional(value="mybastistx",readOnly = true)
	public Date getDBServerTime() throws Exception {
		return commonMapper.getDBDateTime();
	}

	@Override
	@Transactional(value="mybastistx",readOnly = true)
	public List<Combo> getGimTypeCombo() throws Exception {
		return commonMapper.getGimTypeCombo();
	}

	@Override
	@Transactional(value="mybastistx",readOnly = true)
	public List<Combo> getActiveFlagCombo() throws Exception {
		return commonMapper.getActiveFlagCombo(AppConstants.ACTIVE_FLAG_ACTIVE);
	}

}
