package com.tourism.management.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tourism.management.mapper.OrderDao;

@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderDao orderDao;

    /**
     * 添加
     * 
     * @param order
     *
     */
    public int addOrder(Map<String, Object> order) {
    	try {
    		this.orderDao.addOrder(order);
    		
    		return 1;
    	}catch(Exception e){
    		return -1;
    	}
    }
    
    public int updateTradeVol(Map<String, Object> order) {
    	String id = (String)order.get("productId");
    	String type = (String)order.get("type");
    	String sqlStr = "select tradeVolume from ";
    	String updateSqlStr = "update ";
    	switch(type) {
	    	case "line": 
	    		sqlStr = sqlStr + "line ";
	    		updateSqlStr = updateSqlStr + "line ";
	    		break;
	    	case "hotel": 
	    		sqlStr = sqlStr + "hotel ";
	    		updateSqlStr = updateSqlStr + "hotel ";
	    		break;
	    	case "scenic":
	    		sqlStr = sqlStr + "scenic ";
	    		updateSqlStr = updateSqlStr + "scenic ";
	    		break;
	    	default: 
	    		System.out.println("不合理的类型");  	
    	}
    	sqlStr = sqlStr + "where id = " +id;
    	Map<String, Object> sqlMap = new HashMap<String, Object>();
    	sqlMap.put("EXE_SQL", sqlStr);
    	String oldtradeVolume = this.orderDao.queryTradeVolume(sqlMap);
    	System.out.println(oldtradeVolume);
		int tradeVol = Integer.parseInt(oldtradeVolume);
		String ticketNumStr = (String)order.get("ticketNum");
		int ticketNumInt = Integer.parseInt(ticketNumStr);
		int tradeVolume = tradeVol  + ticketNumInt;
		String tradeVolumeStr = String.valueOf(tradeVolume);
		updateSqlStr = updateSqlStr + "set tradeVolume = " + tradeVolumeStr + " where id = " + id;
		Map<String, Object> updateSqlMap = new HashMap<String, Object>();
		updateSqlMap.put("EXE_SQL", updateSqlStr);
		this.orderDao.updateTradeVolume(updateSqlMap);
		
		/*String productId = (String)order.get("productId");
		Map<String, Object> newTradeVolume = new HashMap<String, Object>();
		newTradeVolume.put("id", productId);
		newTradeVolume.put("type", type);
		newTradeVolume.put("tradeVolume", tradeVolume);*/
		
		return 1;
    }
    
    /**
     * 根据用户名和密码查询用户
     * 
     * @param Order
     * 
     */

    public Map<String, Object> queryOrderById(String orderId) {
    	return this.orderDao.queryOrderById(orderId);  
    }
    
    public int updateOrder(Map<String, Object> order) {
		this.orderDao.updateOrder(order);  
    	return 1;
    }
    
    public List<Map<String, Object>> queryOrderAll() {
    	return this.orderDao.queryOrderAll();  
    }
    
    public int updatePf( Map<String, Object> pfData){
    	this.orderDao.updatePf(pfData);
    	return 1;
    }
    
    public Map<String, Object> queryOrderTypeById(String orderId){
    	return this.orderDao.queryOrderTypeById(orderId);	
    }
    
    public String querySatisfaction(Map<String, Object> sqlMap){
    	return this.orderDao.querySatisfaction(sqlMap);
    }
    
    public int updateSatisfaction(Map<String, Object> updateMap){
    	this.orderDao.updateSatisfaction(updateMap);
    	return 1;
    }
}
