package com.tourism.management.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SearchDao {
	
	List<Map<String, Object>> searchHotel(String newKeyWord);
	
	List<Map<String, Object>> searchLine(String newKeyWord);
	
	List<Map<String, Object>> searchScenic(String newKeyWord);
}
