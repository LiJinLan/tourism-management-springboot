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
}
