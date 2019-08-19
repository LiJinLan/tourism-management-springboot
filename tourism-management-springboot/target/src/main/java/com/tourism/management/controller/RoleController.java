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
import com.tourism.management.service.RoleService;


@RequestMapping("role")
@Controller
public class RoleController {
	@Autowired
    private RoleService roleService;
	
	//添加角色
		@RequestMapping(value = "addRole", method = RequestMethod.POST)
	    @ResponseBody
	    public Map<String, Object> addRole(@RequestBody Map<String, Object> role, HttpServletRequest request,
	            HttpServletResponse response) {
			int addRoleFlag = roleService.addRole(role);
	    	Map<String,Object> returnMap = new HashMap<String, Object>();
	    	
	    	if(addRoleFlag == 1) {   //表示新增成功 
	    		returnMap.put("success", true);
	    		returnMap.put("message", "新增角色成功");
	    		returnMap.put("data", null);
	    	}else {
	    		returnMap.put("success", false);
	    		returnMap.put("message", "新增角色失败");
	    		returnMap.put("data", null);
	    	}
	    	return returnMap;
		}
		
	
	/**
     * 获取所有的角色列表
     * @return
     */
    @RequestMapping(value = "queryRoleAll", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryRoleAll(HttpServletRequest request,
            HttpServletResponse response) {

    	Map<String,Object> returnMap = new HashMap<String, Object>();

    	try{
    		List<Map<String, Object>> roleArray = roleService.queryRoleAll();

        	returnMap.put("success", true);
        	returnMap.put("message", "查找角色成功");
        	returnMap.put("data", roleArray);
    	}catch(Exception e){
    		returnMap.put("success", false);
    		returnMap.put("message", "查找角色失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
    }
    
  //修改角色信息
    @RequestMapping(value = "updateRole", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateRole(@RequestBody Map<String, Object> role, HttpServletRequest request,
            HttpServletResponse response) {
    	int result = roleService.updateRole(role);
        Map<String, Object> returnObj = new HashMap<String, Object>();  	
        if(result == 1) {
        	returnObj.put("success",true);
        	returnObj.put("message", "修改角色成功");
        	returnObj.put("data", null);
        }else {
    		returnObj.put("success",false);
    		returnObj.put("message", "修改角色失败");
    		returnObj.put("data", null);
    		return returnObj;
        }
        return returnObj;
    }
    
  //根据角色id删除角色
    @RequestMapping(value = "deleteRoleById/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String, Object> deleteRoleById(@PathVariable String id, HttpServletRequest request,
        HttpServletResponse response) {	
    	int result = roleService.deleteRoleById(id);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	
    	if(result == 1) {   //表示新增成功 
    		returnMap.put("success", true);
    		returnMap.put("message", "删除角色成功");
    		returnMap.put("data", null);
    	}else {
    		returnMap.put("success", false);
    		returnMap.put("message", "删除角色失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
    }
}
