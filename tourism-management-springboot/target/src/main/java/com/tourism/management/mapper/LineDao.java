package com.tourism.management.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LineDao {

	int addLine(Map<String, Object> line);
	
	List<Map<String, Object>> queryLineByName(String name);
	
	List<Map<String, Object>> queryLineAll();
	
	Map<String, Object> queryLineById(String id);
	
	List<Map<String, Object>> queryLineScheduleByLineId(String lineId);
	
	List<Map<String, Object>> queryLineRecommend(Map<String, Object> queryLineRecObj); 
	
	int deleteLineById(String id);
	
	int updateLine(Map<String, Object> lineObj);
	
	int updateLineSchedule(Map<String, Object> newlineSchedule);
	
	int addSchedule(Map<String,Object> schedule);
	
	
}