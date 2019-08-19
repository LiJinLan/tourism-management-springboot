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
import com.tourism.management.service.ScenicService;

@RequestMapping("scenic")
@Controller
public class ScenicController {
	@Autowired
	private ScenicService scenicService;
	
	@Autowired
	private FileService fileService;
	
	//添加景点
	@RequestMapping(value = "addScenic", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addScenic(@RequestBody Map<String, Object> scenic, HttpServletRequest request,
            HttpServletResponse response) {
		int addScenicFlag = scenicService.addScenic(scenic);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	
    	
    	if(addScenicFlag == 1) {   //表示新增成功 
    		returnMap.put("success", true);
    		returnMap.put("message", "新增景点成功");
    		returnMap.put("data", null);
    	}else {
    		returnMap.put("success", false);
    		returnMap.put("message", "景点已存在");
    		returnMap.put("data", null);
    	}
    	return returnMap;
	}
	
	//通过景点名称、所属城市查询景点
    @RequestMapping(value = "queryScenicByNameCity", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> queryScenicByNameCity(@RequestBody Map<String, Object> scenic, HttpServletRequest request,
        HttpServletResponse response) {
    	
    	Map<String, Object> scenicObj = scenicService.queryScenicByNameCity(scenic);
    	String scenicId = (String)scenicObj.get("id");
    	List<Map<String, Object>> scenicList = scenicService.queryFileByScenicId(scenicId);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	Map<String,Object> scenicMap = new HashMap<String, Object>();
    	scenicObj.put("imageList", scenicList);
    	
    	scenicMap.put("scenic", scenicObj); 
    	returnMap.put("success", true);
    	returnMap.put("message", "查找景点成功");
    	returnMap.put("data", scenicMap);
    	return returnMap;
    }
    
    //通过景点名称、所属城市查询景点
    @RequestMapping(value = "queryScenicById/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryScenicById(@PathVariable String id, HttpServletRequest request,
        HttpServletResponse response) {
    	
    	Map<String, Object> scenicObj = scenicService.queryScenicById(id);
    	String scenicId = (String)scenicObj.get("id");
    	List<Map<String, Object>> scenicList = scenicService.queryFileByScenicId(id);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	Map<String,Object> scenicMap = new HashMap<String, Object>();
    	scenicObj.put("imageList", scenicList);
    	
    	scenicMap.put("scenic", scenicObj); 
    	returnMap.put("success", true);
    	returnMap.put("message", "查找景点成功");
    	returnMap.put("data", scenicMap);
    	return returnMap;
    }
    
    //查询所有景点
    @RequestMapping(value = "queryScenicAll", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryScenicAll(HttpServletRequest request,
        HttpServletResponse response) {
   
		List<Map<String, Object>> scenicAllObj = scenicService.queryScenicAll();
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	if(scenicAllObj.size() > 0) {
    		returnMap.put("success", true);
        	returnMap.put("message", "查找所有景点成功");
        	returnMap.put("data", scenicAllObj);
    	}else{
    		returnMap.put("success", false);
        	returnMap.put("message", "查找所有景点失败");
        	returnMap.put("data", scenicAllObj);
    	}
    	return returnMap;
    }
    
    
    
    //根据景点id删除景点
    @RequestMapping(value = "deleteScenicById/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String, Object> deleteScenicById(@PathVariable String id, HttpServletRequest request,
        HttpServletResponse response) {	
    	int scenicObj = scenicService.deleteScenicById(id);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	
    	if(scenicObj == 1) {   //表示新增成功 
    		returnMap.put("success", true);
    		returnMap.put("message", "删除景点成功");
    		returnMap.put("data", null);
    	}else {
    		returnMap.put("success", false);
    		returnMap.put("message", "景点不存在");
    		returnMap.put("data", null);
    	}
    	return returnMap;
    }
    
  //修改景点信息
    @RequestMapping(value = "updateScenic", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateScenic(@RequestBody JSONObject scenic, HttpServletRequest request,
            HttpServletResponse response) {
    	int result = scenicService.updateScenic(scenic);
        Map<String, Object> returnObj = new HashMap<String, Object>();  	
        if(result == 1) {
        	returnObj.put("success",true);
        	returnObj.put("message", "修改景点信息成功");
        	returnObj.put("data", null);
        }else {
    		returnObj.put("success",false);
    		returnObj.put("message", "找不到相应的景点信息");
    		returnObj.put("data", null);
    		return returnObj;
        }
        return returnObj;
    }
    
    
    //景点攻略推荐查询
    @RequestMapping(value="queryScenicRecommend", method=RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> queryScenicRecommend( @RequestBody Map<String, Object> RecommendChoice, HttpServletRequest request,HttpServletResponse response) {
    	Map<String, Object> choiceObj = RecommendChoice;
    	System.out.println( choiceObj );
    	List<Map<String, Object>> regScenicRecommend = this.scenicService.queryScenicRecommend( choiceObj );
    	Map<String, Object> returnMap = new HashMap<String, Object>();
    	if(regScenicRecommend.size() > 0) {
    		returnMap.put("success", true);
    		returnMap.put("message", "景点攻略推荐查询成功");
    		returnMap.put("data", regScenicRecommend);
    	} else {
    		returnMap.put("success", false);
    		returnMap.put("message", "景点攻略推荐查询失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
    }
}
