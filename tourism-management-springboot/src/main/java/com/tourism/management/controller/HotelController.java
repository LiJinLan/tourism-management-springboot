package com.tourism.management.controller;

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

import com.alibaba.fastjson.JSONObject;
import com.tourism.management.service.FileService;
import com.tourism.management.service.HotelService;


@RequestMapping("hotel")
@Controller
public class HotelController {
	@Autowired
	private HotelService hotelService;
	
	@Autowired
	private FileService fileService;
	
	//添加酒店
		@RequestMapping(value = "addHotel", method = RequestMethod.POST)
	    @ResponseBody
	    public Map<String, Object> addhotel(@RequestBody Map<String, Object> hotel, HttpServletRequest request,
	            HttpServletResponse response) {
			int addHotelFlag = hotelService.addHotel(hotel);
	    	Map<String,Object> returnMap = new HashMap<String, Object>();
	    	
	    	
	    	if(addHotelFlag == 1) {   //表示新增成功 
	    		returnMap.put("success", true);
	    		returnMap.put("message", "新增酒店成功");
	    		returnMap.put("data", null);
	    	}else {
	    		returnMap.put("success", false);
	    		returnMap.put("message", "酒店已存在");
	    		returnMap.put("data", null);
	    	}
	    	return returnMap;
		}
		
		//通过酒店名称、所属城市查询酒店
	    @RequestMapping(value = "queryHotelByNameCity", method = RequestMethod.POST)
	    @ResponseBody
	    public Map<String, Object> queryHotelByNameCity(@RequestBody Map<String, Object> hotel, HttpServletRequest request,
	        HttpServletResponse response) {
	    	
	    	Map<String, Object> hotelObj = hotelService.queryHotelByNameCity(hotel);
	    	String hotelId = (String)hotelObj.get("id");
	    	List<Map<String, Object>> hotelList = hotelService.queryFilesByHotelId(hotelId);
	    	Map<String,Object> returnMap = new HashMap<String, Object>();
	    	Map<String,Object> hotelMap = new HashMap<String, Object>();
	    	hotelObj.put("imageList", hotelList);
	    	
	    	hotelMap.put("hotel", hotelObj); 
	    	returnMap.put("success", true);
	    	returnMap.put("message", "查找酒店成功");
	    	returnMap.put("data", hotelMap);
	    	return returnMap;
	    }
	    
	    //通过酒店名称、所属城市查询酒店
	    @RequestMapping(value = "queryHotelById/{id}", method = RequestMethod.GET)
	    @ResponseBody
	    public Map<String, Object> queryHotelById(@PathVariable String id, HttpServletRequest request,
	        HttpServletResponse response) {
	    	
	    	Map<String, Object> hotelObj = hotelService.queryHotelById(id);
	    	String hotelId = (String)hotelObj.get("id");
	    	List<Map<String, Object>> hotelList = hotelService.queryFilesByHotelId(hotelId);
	    	Map<String,Object> returnMap = new HashMap<String, Object>();
	    	Map<String,Object> hotelMap = new HashMap<String, Object>();
	    	hotelObj.put("imageList", hotelList);
	    	
	    	hotelMap.put("hotel", hotelObj); 
	    	returnMap.put("success", true);
	    	returnMap.put("message", "查找酒店成功");
	    	returnMap.put("data", hotelMap);
	    	return returnMap;
	    }
	    
	    //查询所有酒店
	    @RequestMapping(value = "queryHotelAll", method = RequestMethod.GET)
	    @ResponseBody
	    public Map<String, Object> queryHotelAll(HttpServletRequest request,
	        HttpServletResponse response) {
	   
			List<Map<String, Object>> hotelAllObj = hotelService.queryHotelAll();
	    	Map<String,Object> returnMap = new HashMap<String, Object>();
	    	if(hotelAllObj.size() > 0) {
	    		returnMap.put("success", true);
	        	returnMap.put("message", "查找所有酒店成功");
	        	returnMap.put("data", hotelAllObj);
	    	}else{
	    		returnMap.put("success", false);
	        	returnMap.put("message", "查找所有酒店失败");
	        	returnMap.put("data", hotelAllObj);
	    	}
	    	return returnMap;
	    }
	    
	    
	    
	    //根据酒店id删除酒店
	    @RequestMapping(value = "deleteHotelById/{id}", method = RequestMethod.DELETE)
	    @ResponseBody
	    public Map<String, Object> deleteHotelById(@PathVariable String id, HttpServletRequest request,
	        HttpServletResponse response) {	
	    	int hotelObj = hotelService.deleteHotelById(id);
	    	Map<String,Object> returnMap = new HashMap<String, Object>();
	    	
	    	if(hotelObj == 1) {   //表示新增成功 
	    		returnMap.put("success", true);
	    		returnMap.put("message", "删除酒店成功");
	    		returnMap.put("data", null);
	    	}else {
	    		returnMap.put("success", false);
	    		returnMap.put("message", "酒店不存在");
	    		returnMap.put("data", null);
	    	}
	    	return returnMap;
	    }
	    
	  //修改酒店信息
	    @RequestMapping(value = "updateHotel", method = RequestMethod.POST)
	    @ResponseBody
	    public Map<String, Object> updateHotel(@RequestBody JSONObject hotel, HttpServletRequest request,
	            HttpServletResponse response) {
	    	int result = hotelService.updateHotel(hotel);
	        Map<String, Object> returnObj = new HashMap<String, Object>();  	
	        if(result == 1) {
	        	returnObj.put("success",true);
	        	returnObj.put("message", "修改酒店信息成功");
	        	returnObj.put("data", null);
	        }else {
	    		returnObj.put("success",false);
	    		returnObj.put("message", "修改酒店信息失败");
	    		returnObj.put("data", null);
	    		return returnObj;
	        }
	        return returnObj;
	    }
	    
	    
	    
	    //酒店攻略查询
	    
	    @RequestMapping( value = "queryHotelRecommend", method = RequestMethod.POST)
	    @ResponseBody
	    public Map<String, Object> queryHotelRecommend ( @RequestBody Map<String, Object> hotelChoiceObj, HttpServletRequest request, HttpServletResponse response) {
	    	Map<String, Object> choiceObj = hotelChoiceObj;
	    	System.out.println( choiceObj );
	    	List<Map<String, Object>> regHotelRecommend = this.hotelService.queryHotelRecommend( choiceObj );
	    	Map<String, Object> returnHotelMap = new HashMap<String,Object>();
	    	if(regHotelRecommend.size()> 0) {
	    		returnHotelMap.put("success", true);
	    		returnHotelMap.put("message", "推荐酒店攻略查询成功！");
	    		returnHotelMap.put("data", regHotelRecommend);
	    	} else {
	    		returnHotelMap.put("success", false);
	    		returnHotelMap.put("message", "推荐酒店攻略查询失败！");
	    		returnHotelMap.put("data", null);
	    	}
	    	return returnHotelMap;
	    }
	    
	    
	    
	    
	    
}








