package com.tourism.management.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface HotelDao {
	int addHotel(Map<String, Object> hotel);
	
	List<Map<String, Object>> queryHotelByName(String name);
	
	List<Map<String, Object>> queryHotelRecommend(Map<String, Object> queryHotelSqlObj);
	
	Map<String, Object> queryHotelByNameCity(Map<String, Object> hotel);
	
	List<Map<String, Object>> queryHotelAll();
	
	Map<String, Object> queryHotelById(String id);
	
	Map<String, Object> queryHotelFileByFileId(String fileId);
	
	int deleteHotelById(String id);
	
	int updateHotel(Map<String, Object> hotelObj);
	
	int addHotelFile(Map<String,Object> hotelFile);
	
	List<Map<String, Object>> queryFilesByHotelId(String hotelId);
	
	int updateHotelFileById(Map<String, Object> hotelObj);
}
