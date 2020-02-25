package com.dxc.application.mybatis.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.dxc.application.model.GimDetail;
import com.dxc.application.model.GimHeader;

public interface GIMMasterMapper {
	
	public GimHeader findGimHeaderByPrimaryKey(@Param("gimType") String gimType);
	public List<GimHeader> findGimHeader(GimHeader gimHeader);
	public int saveGimHeader(GimHeader criteria);
	public int updateGimHeader(GimHeader criteria);
	public int updateActiveFlagOfGimDetailByGimHeaderActiveFlag(GimHeader criteria);
	public List<GimDetail> findGimDetail(GimDetail criteria);
	public GimDetail findGimDetailByPrimaryKey(GimDetail criteria);
	public int saveGimDetail(GimDetail criteria);
	public int updateActiveFlagOfGimHeaderByGimDetailActiveFlag(GimHeader criteria);
	public int updateGimDetail(GimDetail criteria);
	public int deleteGimDetailByKeys(GimDetail criteria);
}
