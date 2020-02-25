package com.dxc.application.mybatis.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.dxc.application.model.Combo;

public interface CommonMapper {
	Date getDBDateTime();
	List<Combo> getGimTypeCombo();
	List<Combo> getActiveFlagCombo(@Param("activeFlag") String activeFlag);
}
