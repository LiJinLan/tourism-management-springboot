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

}











