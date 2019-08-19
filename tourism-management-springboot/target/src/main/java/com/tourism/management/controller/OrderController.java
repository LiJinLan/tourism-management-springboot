package com.tourism.management.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tourism.management.service.OrderService;
import com.tourism.management.util.FileUtil;

@RequestMapping("order")
@Controller
public class OrderController {
	@Autowired
    private OrderService orderService;
    
    /**
     * 添加订单信息
     * @param order
     * @return
     */
    @RequestMapping(value = "addOrder", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addOrder(@RequestBody Map<String, Object> order, HttpServletRequest request,
        HttpServletResponse response) {
    	
    	order.put("id", FileUtil.getTimestamp());
    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        String orderTime = df.format(new Date());  // new Date()为获取当前系统时间
    	order.put("orderTime", orderTime);
    	int addOrderFlag = orderService.addOrder(order);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	
    	if(addOrderFlag == 1) {   //表示新增成功
    		returnMap.put("success", true);
    		returnMap.put("message", "新增订单成功");
    		returnMap.put("data", order);
    	}else {
    		returnMap.put("success", false);
    		returnMap.put("message", "提交订单失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
    }
    
    //修改订单信息
    @RequestMapping(value = "updateOrder", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateOrder(@RequestBody Map<String, Object> order, HttpServletRequest request,
            HttpServletResponse response) {
    	int result = orderService.updateOrder(order);
        Map<String, Object> returnObj = new HashMap<String, Object>();
        	
        if(result == 1) {
        	returnObj.put("success",true);
        	returnObj.put("message", "修改信息成功");
        	returnObj.put("data", null);
        }else {
    		returnObj.put("success",false);
    		returnObj.put("message", "找不到相应的订单信息");
    		returnObj.put("data", null);
    		return returnObj;
        }
        return returnObj;
    }
 
    
    /**
     * 
     * @param orderId
     * @return
     */
    @RequestMapping(value = "queryOrderById/{orderId}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryOrderById(@PathVariable String orderId, HttpServletRequest request,
        HttpServletResponse response) {
    	Map<String, Object> orderObj= orderService.queryOrderById(orderId);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	returnMap.put("success", true);
    	returnMap.put("message", "查找订单成功");
    	returnMap.put("data", orderObj);
    	return returnMap;
    }  
    

    //查询所有订单
    @RequestMapping(value = "queryOrderAll", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryOrderAll(HttpServletRequest request,
        HttpServletResponse response) {
   
		List<Map<String, Object>> orderAllObj = orderService.queryOrderAll();
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	if(orderAllObj.size() > 0) {
    		returnMap.put("success", true);
        	returnMap.put("message", "查找所有订单成功");
        	returnMap.put("data", orderAllObj);
    	}else{
    		returnMap.put("success", false);
        	returnMap.put("message", "查找所有订单失败");
        	returnMap.put("data", orderAllObj);
    	}
    	return returnMap;
    }
    
}
