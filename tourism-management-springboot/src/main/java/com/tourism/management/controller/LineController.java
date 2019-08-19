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
import java.util.ArrayList;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Calendar;

import com.alibaba.fastjson.JSONObject;
import com.tourism.management.service.LineService;

@RequestMapping("line")
@Controller
public class LineController {
	@Autowired
	private LineService lineService;
	
	//添加线路
	@RequestMapping(value = "addLine", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addLine(@RequestBody JSONObject line, HttpServletRequest request,
            HttpServletResponse response) {
		int addlineFlag = lineService.addLine(line);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	
    	
    	if(addlineFlag == 1) {   //表示新增成功 
    		returnMap.put("success", true);
    		returnMap.put("message", "新增线路成功");
    		returnMap.put("data", null);
    	}else {
    		returnMap.put("success", false);
    		returnMap.put("message", "线路已存在");
    		returnMap.put("data", null);
    	}
    	return returnMap;
	}
    
    //通过线路名称、所属城市查询线路
    @RequestMapping(value = "queryLineById/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryLineById(@PathVariable String id, HttpServletRequest request,
        HttpServletResponse response) {
    	
    	Map<String, Object> lineObj = lineService.queryLineById(id);
    	String lineId = (String)lineObj.get("id");
    	List<Map<String, Object>> lineList = lineService.queryLineScheduleByLineId(lineId);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	Map<String,Object> lineMap = new HashMap<String, Object>();
    	lineObj.put("imageList", lineList);
    	
    	lineMap.put("line", lineObj); 
    	returnMap.put("success", true);
    	returnMap.put("message", "查找线路成功");
    	returnMap.put("data", lineMap);
    	return returnMap;
    }
    
    //查询所有线路
    @RequestMapping(value = "queryLineAll", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryLineAll(HttpServletRequest request,
        HttpServletResponse response) {
   
		List<Map<String, Object>> lineAllObj = lineService.queryLineAll();
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	if(lineAllObj.size() > 0) {
    		returnMap.put("success", true);
        	returnMap.put("message", "查找所有线路成功");
        	returnMap.put("data", lineAllObj);
    	}else{
    		returnMap.put("success", false);
        	returnMap.put("message", "查找所有线路失败");
        	returnMap.put("data", lineAllObj);
    	}
    	return returnMap;
    }
    
    
    
    //根据线路id删除线路
    @RequestMapping(value = "deleteLineById/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String, Object> deleteLineById(@PathVariable String id, HttpServletRequest request,
        HttpServletResponse response) {	
    	int lineObj = lineService.deleteLineById(id);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	
    	if(lineObj == 1) {   //表示新增成功 
    		returnMap.put("success", true);
    		returnMap.put("message", "删除线路成功");
    		returnMap.put("data", null);
    	}else {
    		returnMap.put("success", false);
    		returnMap.put("message", "线路不存在");
    		returnMap.put("data", null);
    	}
    	return returnMap;
    }
    
  //修改线路信息
    @RequestMapping(value = "updateLine", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateLine(@RequestBody JSONObject line, HttpServletRequest request,
            HttpServletResponse response) {
    	int result = lineService.updateLine(line);
        Map<String, Object> returnObj = new HashMap<String, Object>();  	
        if(result == 1) {
        	returnObj.put("success",true);
        	returnObj.put("message", "修改线路信息成功");
        	returnObj.put("data", null);
        }else {
    		returnObj.put("success",false);
    		returnObj.put("message", "修改线路信息失败");
    		returnObj.put("data", null);
    		return returnObj;
        }
        return returnObj;
    }



    @RequestMapping( value = "queryLineRecommend", method = RequestMethod.POST)
    @ResponseBody
    public Map< String, Object >   queryLineRecommend ( @RequestBody Map< String, Object > RecommendChoice, 
        HttpServletRequest request,HttpServletResponse response ) {
        Map< String, Object> choiceObj = RecommendChoice;
        System.out.println( choiceObj );
        
        List<Map<String, Object>> regLineRecomList = lineService.queryLineRecommend(choiceObj);
        Map< String, Object > returnMap = new HashMap<String, Object>();
        if( regLineRecomList.size() > 0 ){
        	returnMap.put("success", true);
        	returnMap.put("message", "查询推荐线路成功");
        	returnMap.put("data", regLineRecomList);
        	
        }else {
        	returnMap.put("success", false);
        	returnMap.put("message", "查询推荐线路失败");
        	returnMap.put("data", null);
        }
        
        return returnMap;
    } 
    
    @RequestMapping( value = "referenceRecom", method = RequestMethod.POST)
    @ResponseBody
    public Map< String, Object >   referenceRecom ( @RequestBody Map< String, Object > timeData, 
            HttpServletRequest request,HttpServletResponse response ) {
    	
    	String presentTime = (String)timeData.get("presentTime");
    	
    	Long timeLong = new Date().getTime();	//获取当前时间的时间戳
    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
    	Date date;
    	try {
			date = df.parse(df.format(timeLong));
			
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
    	String nowDateTime = df.format(date);	//当前时间的时间格式
    	System.out.println(nowDateTime);
    	int daysBefore = this.lineService.getDaysBefore();
    	long daysBeforeStamp= (long)daysBefore * 24 * 60 *  60 * 1000;
    	Long newTimeTtamp = timeLong - daysBeforeStamp;	//当前时间戳减去前多少天的时间戳
    	
    	try {
			date = df.parse(df.format(newTimeTtamp));
			
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
    	String newDateTime = df.format(date);	//当前时间减去推荐前多少天的时间格式
    	System.out.println(newDateTime);
    	
    	String sqlStr = "select * from all_order where STR_TO_DATE(orderTime,'%Y-%m-%d %H:%i:%s') < STR_TO_DATE('" + 
    	nowDateTime + "','%Y-%m-%d %H:%i:%s') and STR_TO_DATE(orderTime,'%Y-%m-%d %H:%i:%s') > STR_TO_DATE('" + newDateTime + 
    	"','%Y-%m-%d %H:%i:%s') and status <> '订单已取消'";
    	Map<String, Object> sqlMap = new HashMap<String, Object>();
    	sqlMap.put("EXE_SQL", sqlStr);
    	List<Map<String, Object>> orderList = this.lineService.queryOrderRecom(sqlMap);	//orderList满足时间段的所有订单数组
    	List<Map<String, Object>> queryLineOther = new ArrayList<Map<String, Object>>();
    	List<Map<String, Object>> queryScenicOther = new ArrayList<Map<String, Object>>();
    	List<Map<String, Object>> queryHotelOther = new ArrayList<Map<String, Object>>();
    	Map<String, Object> returnMap = new HashMap<String, Object>();
    	if(orderList != null){
    		Map<String, Object> orderByUserMap = new HashMap<String, Object>();
        	for(int i = 0; i < orderList.size(); i++) {
        		Map<String, Object> item = orderList.get(i);	//拿到数组当前的对象
        		List<Map<String, Object>> userOrderList = new ArrayList<Map<String, Object>>();	//定义空数组
        		String userId = (String)item.get("userId");
        		if(!orderByUserMap.containsKey(userId)){
        			orderByUserMap.put(userId, userOrderList);
        		}
        		
        	}
        	for(int i = 0; i < orderList.size(); i++) {
        		Map<String, Object> item = orderList.get(i);
        		String userId = (String)item.get("userId");
        		List<Map<String, Object>> list = (List<Map<String, Object>>)orderByUserMap.get(userId);
        		if(list != null) {
        			list.add(item);
        		}
        	}
        	
        	List<Map<String, Object>> afterOrderAllList = new ArrayList<Map<String, Object>>();
        	for(String key: orderByUserMap.keySet()) {
        		//String userId = (String)orderByUserMap.get(key);
        		List<Map<String, Object>> tempList = (List<Map<String, Object>>)orderByUserMap.get(key);
        		
        		for(int i = 0; i < tempList.size(); i++) {
        			Map<String, Object> itemMap = tempList.get(i);
        			String orderProductId = (String)itemMap.get("productId");
        			String id = (String)timeData.get("id");
        			if(orderProductId.equals(id)) {
        				for(int j = i+1; j < tempList.size(); j++) {
        					Map<String, Object> afterMap = tempList.get(j);
        					afterOrderAllList.add(afterMap);		////满足预订某订单后再预订的别的订单数组
        				}
        				break;
        			}       			
        		}
        	}
        	
        	if(afterOrderAllList != null) {
        		Map<String, Object> productMap = new HashMap<String, Object>();
        		for(int i = 0; i < afterOrderAllList.size(); i++) {
        			List<Map<String, Object>> itemList = new ArrayList<Map<String, Object>>();
            		Map<String, Object> itemMap2 = afterOrderAllList.get(i);
            		String orderProductId = (String)itemMap2.get("productId");
            		if(!productMap.containsKey(orderProductId)){
            			productMap.put(orderProductId, itemList);	
            		}
            	}
        		//按产品id分类，每个产品有多少个订单
        		for(int i = 0; i < afterOrderAllList.size(); i++) {
        			Map<String, Object> itemMap3 = afterOrderAllList.get(i);
        			String orderProductId = (String)itemMap3.get("productId");
        			List<Map<String, Object>> proOrderList = (List<Map<String, Object>>)productMap.get(orderProductId);
        			if(proOrderList != null) {
        				proOrderList.add(itemMap3);
        			}
        		}
        		
        		List<String> productIdList = new ArrayList<String>();
        		for(String key: productMap.keySet()){
        			productIdList.add(key);
        		}
        		//List<String> proList = new ArrayList<String>();
        		 //冒泡排序,将产品id分类的订单长度从大到小进行排序
        		for(int i = 0; i < productIdList.size(); i++) {
        			for(int j = 0; j < productIdList.size()-1-i; j++) {
        				String IdItem1 = productIdList.get(j);
            			List<Map<String, Object>> itemList1 = (List<Map<String, Object>>)productMap.get(IdItem1);
            			int IdItem1Length = itemList1.size();
            			
        				String IdItem2 = productIdList.get(j+1);
        				List<Map<String, Object>> itemList2 = (List<Map<String, Object>>)productMap.get(IdItem2);
            			int IdItem2Length = itemList2.size();
        				if(IdItem1Length < IdItem2Length ) {
        					String temp = productIdList.get(j);
        					productIdList.set(j, productIdList.get(j+1));
        					productIdList.set(j+1, temp);      					
        				}
        			}     			
        		}
        		for(int i = 0; i < productIdList.size(); i++) {
        			System.out.println(productIdList.get(i));
        		}
        		if(productIdList.size() > 0) {
        			String querySqlStr = "select * from line where ";
            		Map<String, Object> querySQLMap = new HashMap<String, Object>();
            		if(productIdList.size() > 3) {
            			for(int i = 0; i < 3; i++) {
            				if(i != 0){
            					querySqlStr = querySqlStr + " or ";
            				}
            				String id = productIdList.get(i);
            				querySqlStr = querySqlStr + "id = '" + id +"'";
            				
            			}
            			
            		} else {
            			for(int i = 0; i < productIdList.size(); i++) {
            				if(i != 0){
            					querySqlStr = querySqlStr + " or ";
            				}
            				String id = productIdList.get(i);
            				querySqlStr = querySqlStr + "id = '" + id +"'";
            			}
            		}
            		querySQLMap.put("EXE_SQL", querySqlStr);
        			//List<Map<String, Object>> lineOterQuery = this.lineService.queryOtherRecom(querySQLMap);
            		queryLineOther = this.lineService.queryOtherRecom(querySQLMap);
        			
            		String querySqlStr2 = "select * from scenic where ";
            		Map<String, Object> querySQLMap2 = new HashMap<String, Object>();
            		if(productIdList.size() > 3) {
            			for(int i = 0; i < 3; i++) {
            				if(i != 0){
            					querySqlStr2 = querySqlStr2 + " or ";
            				}
            				String id = productIdList.get(i);
            				querySqlStr2 = querySqlStr2 + "id = '" + id +"'";
            				
            			}
            			
            		} else {
            			for(int i = 0; i < productIdList.size(); i++) {
            				if(i != 0){
            					querySqlStr2 = querySqlStr2 + " or ";
            				}
            				String id = productIdList.get(i);
            				querySqlStr2 = querySqlStr2 + "id = '" + id +"'";
            			}
            		}
            		querySQLMap2.put("EXE_SQL", querySqlStr2);
        			//List<Map<String, Object>> lineOterQuery = this.lineService.queryOtherRecom(querySQLMap);
            		queryScenicOther = this.lineService.queryOtherRecom(querySQLMap2);
            		for(int i = 0; i < queryScenicOther.size(); i++) {
            			Map<String, Object> itemMap = queryScenicOther.get(i);
            			queryLineOther.add(itemMap);
            		}
            		
            		
            		String querySqlStr3 = "select * from hotel where ";
            		Map<String, Object> querySQLMap3 = new HashMap<String, Object>();
            		if(productIdList.size() > 3) {
            			for(int i = 0; i < 3; i++) {
            				if(i != 0){
            					querySqlStr3 = querySqlStr3 + " or ";
            				}
            				String id = productIdList.get(i);
            				querySqlStr3 = querySqlStr3 + "id = '" + id +"'";
            				
            			}
            			
            		} else {
            			for(int i = 0; i < productIdList.size(); i++) {
            				if(i != 0){
            					querySqlStr3 = querySqlStr3 + " or ";
            				}
            				String id = productIdList.get(i);
            				querySqlStr3 = querySqlStr3 + "id = '" + id +"'";
            			}
            		}
            		querySQLMap3.put("EXE_SQL", querySqlStr3);
        			//List<Map<String, Object>> lineOterQuery = this.lineService.queryOtherRecom(querySQLMap);
            		queryHotelOther = this.lineService.queryOtherRecom(querySQLMap3);
            		for(int i = 0; i < queryHotelOther.size(); i++) {
            			Map<String, Object> itemMap = queryHotelOther.get(i);
            			queryLineOther.add(itemMap);
            		}
        		}
        		
        	}
        	
    	}
    	//Map< String, Object > returnMap = new HashMap<String, Object>();
    	if(queryLineOther.size() > 0 ) {
    		returnMap.put("data", queryLineOther);
        	returnMap.put("success", true);
        	returnMap.put("message", "其他用户推荐成功");	
    	} else {
    		returnMap.put("data", queryLineOther);
        	returnMap.put("success", false);
        	returnMap.put("message", "其他用户推荐失败");
    	}
    	return returnMap;
    	
    	
    }
    

}











