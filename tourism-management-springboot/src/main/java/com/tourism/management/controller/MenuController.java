package com.tourism.management.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

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
import com.tourism.management.service.MenuService;
import com.tourism.management.util.RedisUtil;

@RequestMapping("menu")
@Controller
public class MenuController {
	@Autowired
    private MenuService menuService;
    
    @Autowired
    private RedisUtil redisUtil;

  //添加一级菜单
    @RequestMapping(value = "addFirstMenu", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addFirstMenu(@RequestBody Map<String, Object> firstMenu, HttpServletRequest request,
            HttpServletResponse response) {
		int addFirstMenuFlag = menuService.addFirstMenu(firstMenu);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	
    	if(addFirstMenuFlag == 1) {   //表示新增成功 
    		returnMap.put("success", true);
    		returnMap.put("message", "新增一级菜单成功");
    		returnMap.put("data", null);
    	}else {
    		returnMap.put("success", false);
    		returnMap.put("message", "新增一级菜单失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
	}
    
    //添加二级菜单
    @RequestMapping(value = "addSecondMenu", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addSecondMenu(@RequestBody Map<String, Object> secondMenu, HttpServletRequest request,
            HttpServletResponse response) {
    	
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	try{
    		int addSecondMenuFlag = menuService.addSecondMenu(secondMenu);
    		returnMap.put("success", true);
    		returnMap.put("message", "新增二级菜单成功");
    		returnMap.put("data", null);
    	}catch(Exception e) {
    		returnMap.put("success", false);
    		returnMap.put("message", "新增二级菜单失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
	}
	
  //添加role_second_menu角色二级菜单
    @RequestMapping(value = "addRoleSecondMenu", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addRoleSecondMenu(@RequestBody Map<String, Object> roleSecondMenu, HttpServletRequest request,
            HttpServletResponse response) {
    	
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	try{
    		int addRoleSecondMenuFlag = menuService.addRoleSecondMenu(roleSecondMenu);
    		returnMap.put("success", true);
    		returnMap.put("message", "新增角色二级菜单成功");
    		returnMap.put("data", null);
    	}catch(Exception e) {
    		returnMap.put("success", false);
    		returnMap.put("message", "新增角色二级菜单失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
	}
    
  //查询所有一级菜单
    @RequestMapping(value = "queryFirstMenuAll", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryFirstMenuAll(HttpServletRequest request,
        HttpServletResponse response) {
   
		List<Map<String, Object>> firstMenuObj = menuService.queryFirstMenuAll();
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	if(firstMenuObj.size() > 0) {
    		returnMap.put("success", true);
        	returnMap.put("message", "查找所有一级菜单成功");
        	returnMap.put("data", firstMenuObj);
    	}else{
    		returnMap.put("success", false);
        	returnMap.put("message", "查找所有一级菜单失败");
        	returnMap.put("data", firstMenuObj);
    	}
    	return returnMap;
    }
    
    
    /**
     * 根据角色来获取前端的菜单列表
     * @param roleId
     * @return
     */
    @RequestMapping(value = "queryMenusByRole/{roleId}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryMenusByRole(@PathVariable String roleId, HttpServletRequest request,
        HttpServletResponse response) {
    	
    	Map<String,Object> menuMap = new HashMap<String, Object>();
    	
    	try{
    		List<Map<String, Object>> menuList = menuService.queryMenusByRole(roleId);
    		menuMap.put("success", true);
	    	menuMap.put("message", "查找菜单成功");
	    	menuMap.put("data", menuList);
    	}catch(Exception e){
    		menuMap.put("success", false);
    		menuMap.put("message", "查找菜单失败");
    		menuMap.put("data", null);
    	}
    	return menuMap;
    }
    
    /**
     * 获取所有的菜单列表
     * @return
     */
    @RequestMapping(value = "queryMenusAll", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> queryMenusAll(HttpServletRequest request,
            HttpServletResponse response) {

    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	Map<String,Object> menuMap = new HashMap<String, Object>();
    	try{
    		List<Map<String, Object>> firstMenuArray = menuService.queryFirstMenuAll();
        	List<Map<String, Object>> secondMenuArray = menuService.querySecondMenuAll();
        	menuMap.put("firstMenus", firstMenuArray);
        	menuMap.put("secondMenus", secondMenuArray);
        	returnMap.put("success", true);
        	returnMap.put("message", "查找菜单成功");
        	returnMap.put("data", menuMap);
    	}catch(Exception e){
    		returnMap.put("success", false);
    		returnMap.put("message", "查找菜单失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
    }
    
    //修改一级菜单
    @RequestMapping(value = "updateFirstMemu", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateFirstMemu(@RequestBody Map<String, Object> firstMenu, HttpServletRequest request,
            HttpServletResponse response) {
    	int result = menuService.updateFirstMemu(firstMenu);
        Map<String, Object> returnObj = new HashMap<String, Object>();  	
        if(result == 1) {
        	returnObj.put("success",true);
        	returnObj.put("message", "修改一级菜单成功");
        	returnObj.put("data", null);
        }else {
    		returnObj.put("success",false);
    		returnObj.put("message", "修改一级菜单失败");
    		returnObj.put("data", null);
    		return returnObj;
        }
        return returnObj;
    }
    
  //修改二级菜单
    @RequestMapping(value = "updateSecondMemu", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateSecondMemu(@RequestBody Map<String, Object> secondMenu, HttpServletRequest request,
            HttpServletResponse response) {
    	int result = menuService.updateSecondMemu(secondMenu);
        Map<String, Object> returnObj = new HashMap<String, Object>();  	
        if(result == 1) {
        	returnObj.put("success",true);
        	returnObj.put("message", "修改二级菜单成功");
        	returnObj.put("data", null);
        }else {
    		returnObj.put("success",false);
    		returnObj.put("message", "修改二级菜单失败");
    		returnObj.put("data", null);
    		return returnObj;
        }
        return returnObj;
    }
    
  //根据id删除二级菜单表
    @RequestMapping(value = "deleteSecondMenu/{secondMenuId}", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String, Object> deleteSecondMenu(@PathVariable String secondMenuId, HttpServletRequest request,
        HttpServletResponse response) {	
    	int result = menuService.deleteSecondMenu(secondMenuId);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	
    	if(result == 1) {   //表示新增成功 
    		returnMap.put("success", true);
    		returnMap.put("message", "删除二级菜单成功");
    		returnMap.put("data", null);
    	}else {
    		returnMap.put("success", false);
    		returnMap.put("message", "删除二级菜单失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
    }
    
    
    @RequestMapping(value = "deleteFirstMenu/{firstMenuId}", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String, Object> deleteFirstMenu (@PathVariable String firstMenuId, HttpServletRequest request,
    	HttpServletResponse response) { 
    	int result = this.menuService.deleteFirstMenu(firstMenuId);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	
    	if(result == 1) { 
    		returnMap.put("success", true);
    		returnMap.put("message", "删除菜单成功");
    		returnMap.put("data", null);
    	}else {
    		returnMap.put("success", false);
    		returnMap.put("message", "删除菜单失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
    }
    
    
    
    //根据角色id和二级菜单id删除角色二级菜单表
    @RequestMapping(value = "deleteRoleSecondMenu", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String, Object> deleteRoleSecondMenu(@RequestBody List<Map<String, Object>> recordArray, HttpServletRequest request,
        HttpServletResponse response) {
    	
    	int result = menuService.deleteRoleSecondMenu(recordArray);
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	
    	if(result == 1) {  
    		returnMap.put("success", true);
    		returnMap.put("message", "删除菜单成功");
    		returnMap.put("data", null);
    	}else {
    		returnMap.put("success", false);
    		returnMap.put("message", "删除菜单失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
    }
    
  //添加多个role_second_menu角色二级菜单
    @RequestMapping(value = "addRoleSecondMenuArray", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addRoleSecondMenuArray(@RequestBody List<Map<String, Object>> roleSecondMenuArray, HttpServletRequest request,
            HttpServletResponse response) {
    	
    	Map<String,Object> returnMap = new HashMap<String, Object>();
    	try{
    		if (roleSecondMenuArray.size() != 0) {
            	for(int i = 0; i< roleSecondMenuArray.size(); i++) {
            		Map<String, Object> record = roleSecondMenuArray.get(i);
    	        	this.menuService.addRoleSecondMenu(record);
            	}
            }
    		
    		returnMap.put("success", true);
    		returnMap.put("message", "新增多个角色二级菜单成功");
    		returnMap.put("data", null);
    	}catch(Exception e) {
    		returnMap.put("success", false);
    		returnMap.put("message", "新增多个角色二级菜单失败");
    		returnMap.put("data", null);
    	}
    	return returnMap;
	}   
}
