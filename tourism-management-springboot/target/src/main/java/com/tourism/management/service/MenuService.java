package com.tourism.management.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.tourism.management.mapper.MenuDao;
import com.tourism.management.util.FileUtil;
import com.tourism.management.util.RedisUtil;

@Service
@Transactional
public class MenuService {
	@Autowired
    private MenuDao menuDao;

    @Autowired
    private RedisUtil redisUtil;
    
    public int addFirstMenu(Map<String, Object> firstMenu) {
    	String name = String.valueOf(firstMenu.get("name"));
    	List<Map<String, Object>> firstMenuList = this.menuDao.queryFirstMenuByName(name);
        if (firstMenuList.size() == 0) {
        	String fristMenuId = String.valueOf(FileUtil.getTimestamp());
        	firstMenu.put("id", fristMenuId); 
        	this.menuDao.addFirstMenu(firstMenu);
        	return 1;
        } 
        return -1;
    }
    
    public int addSecondMenu(Map<String, Object> secondMenu) {
    	try{
    		String secondMenuId = String.valueOf(FileUtil.getTimestamp());
        	secondMenu.put("id", secondMenuId); 
        	this.menuDao.addSecondMenu(secondMenu);
        	return 1;
    	}catch(Exception e){
        	return -1;
    	}
    }
    
    public int addRoleSecondMenu(Map<String, Object> roleSecondMenu) {
    	try{
    		String roleSecondMenuId = String.valueOf(FileUtil.getTimestamp());
    		roleSecondMenu.put("id", roleSecondMenuId); 
        	this.menuDao.addRoleSecondMenu(roleSecondMenu);
        	return 1;
    	}catch(Exception e) {
        	return -1;
    	}
    }
    
    public List<Map<String, Object>> queryFirstMenuAll() {
    	return this.menuDao.queryFirstMenuAll();  
    }
    
    /**
     * 根据角色来获取前端的菜单列表
     * @param roleId
     */
    public List<Map<String, Object>> queryMenusByRole(String roleId) {
    	List<Map<String, Object>> returnMap = new ArrayList<>();	//定义一个新的对象数组
    	List<Map<String, Object>> roleMenus = menuDao.queryMenusByRole(roleId);	//通过角色id来查询用户的菜单
    	Map<String, Object> map = null;
    	Map<String, Object> secondMap = null;
    	List<Object> secondList = null;
    	Set<String> list = new HashSet<>();
    	for(int i = 0; i < roleMenus.size(); i++) {
    		Map<String, Object> item = roleMenus.get(i);
    		String firstMenu  = (String)item.get("firstMenu");
    		String firstMenuId  = (String)item.get("firstMenuId");
    		String firstMenuImg  = (String)item.get("imagePath");
    		if(!list.contains(firstMenu)){
    			list.add(firstMenu);
    			map = new HashMap();	//实例化一个空对象
    			secondMap = new HashMap();
    			secondList = new ArrayList<>();	//实例化一个空数组，存放二级菜单
    			map.put("name",firstMenu);
    			map.put("firstMenuId",firstMenuId);
    			map.put("firstMenuImg",firstMenuImg);
    			map.put("children", secondList);
    			secondMap.put("name", item.get("secondMenu"));
    			secondMap.put("url", item.get("url"));
    			secondMap.put("secondMenuId", item.get("secondMenuId"));
    			secondList.add(secondMap);
    			returnMap.add(map);
    		}else{
    			secondMap = new HashMap();
    			secondMap.put("name", item.get("secondMenu"));
    			secondMap.put("url", item.get("url"));
    			secondMap.put("secondMenuId", item.get("secondMenuId"));
    			secondList.add(secondMap);
    		}
    	}
    	return returnMap;
    }
    
    /**
     * 获取所有的二级菜单列表
     */
    public List<Map<String, Object>> querySecondMenuAll() {
    	return this.menuDao.querySecondMenuAll();  
    }
    
    public int updateFirstMemu(Map<String, Object> firstMenu) {
    	String id = (String)firstMenu.get("id");
    	Map<String, Object> firstMenuObj = this.menuDao.queryFirstMenuById(id);
    	if(firstMenuObj == null) {
    		return -1;
    	}else {
    		this.menuDao.updateFirstMemu(firstMenu);  
        	return 1;
    	}
    }
    
    public int updateSecondMemu(Map<String, Object> secondMenu) {
    	String id = (String)secondMenu.get("id");
    	Map<String, Object> secondMenuObj = this.menuDao.querySecondMenuById(id);
    	if(secondMenuObj == null) {
    		return -1;
    	}else {
    		String firstMenuId = (String)secondMenuObj.get("fmid");
    		secondMenu.put("fmid", firstMenuId);
    		this.menuDao.updateSecondMemu(secondMenu);  
        	return 1;
    	}
    }
    
    public int deleteSecondMenu(String secondMenuId) {
    	String id = secondMenuId;
    	Map<String, Object> firstMenuObj = this.menuDao.querySecondMenuById(id);
        if (firstMenuObj == null) {
            return -1;
        }else {
	        this.menuDao.deleteSecondMenu(secondMenuId);
        	return 1;
        }
    }
    
    public int deleteRoleSecondMenu(List<Map<String, Object>> recordArray) {
    	
        if (recordArray.size() == 0) {
            return -1;
        } else {
        	for(int i = 0; i< recordArray.size(); i++) {
        		Map<String, Object> record = recordArray.get(i);
	        	this.menuDao.deleteRoleSecondMenu(record);
        	}
        	return 1;
        }
    }
}
