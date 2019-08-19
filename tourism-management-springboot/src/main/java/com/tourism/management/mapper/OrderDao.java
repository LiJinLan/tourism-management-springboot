package com.tourism.management.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderDao {
	
	int addOrder(Map<String, Object> order);
	
	List<Map<String, Object>> queryOrderByName(String name);
	
	List<Map<String, Object>> queryOrderAll();
	
	Map<String, Object> queryOrderById(String orderId);
	
	int updateOrder(Map<String, Object> order);
	
	String queryTradeVolume(Map<String, Object> sqlMap);
	
	int updateTradeVolume(Map<String, Object> updateSqlMap);
	
	int updatePf(Map<String, Object> pfData);
	
	Map<String, Object> queryOrderTypeById(String orderId);
	
	String querySatisfaction(Map<String, Object> sqlMap);
	
	int updateSatisfaction(Map<String, Object> updateMap);

}
