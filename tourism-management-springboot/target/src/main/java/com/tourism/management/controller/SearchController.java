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

import com.tourism.management.service.SearchService;

@RequestMapping("search")
@Controller
public class SearchController {
	@Autowired
	private SearchService searchService;
	
	@RequestMapping(value = "searchByKeyWord", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> searchByKeyWord(@RequestBody Map<String, Object> search, HttpServletRequest request,
        HttpServletResponse response) {
    	
    	Map<String, Object> searchObj = searchService.searchByKeyWord(search);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	if(searchObj.size() > 0){
	    	returnMap.put("success", true);
	    	returnMap.put("message", "搜索成功");
	    	returnMap.put("data", searchObj);
    	}else{
    		returnMap.put("success", false);
        	returnMap.put("message", "搜索失败");
        	returnMap.put("data", null);
    	}
    	return returnMap;
    }
    
}
