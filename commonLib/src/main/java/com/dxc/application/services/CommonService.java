package com.dxc.application.services;

import java.util.Date;
import java.util.List;

import com.dxc.application.model.Combo;

public interface CommonService {
	Date getDBServerTime() throws Exception;
	List<Combo> getGimTypeCombo() throws Exception;
	List<Combo> getActiveFlagCombo() throws Exception;
}
