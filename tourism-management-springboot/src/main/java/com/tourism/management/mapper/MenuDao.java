package com.tourism.management.mapper;

import org.apache.ibatis.annotations.Mapper;
import java.util.List;
import java.util.Map;


@Mapper
public interface MenuDao {
	int addFirstMenu(Map<String, Object> firstMenu);
	
	int addSecondMenu(Map<String, Object> secondMenu);
	
	int addRoleSecondMenu(Map<String, Object> roleSecondMenu);
	
	int updateIsdelete(Map<String, Object> updateSqlObj);
	
	List<Map<String, Object>> queryFirstMenuByName(String name);
	
	List<Map<String, Object>> querySecondMenuByFmid(String fmid);
	
	List<Map<String, Object>> queryFirstMenuAll();
	
	List<Map<String, Object>> querySecondMenuAll();
	//根据角色来获取前端的菜单列表
	List<Map<String, Object>> queryMenusByRole(String roleId);
	
	Map<String, Object> queryFirstMenuById(String id);
	
	int updateFirstMemu(Map<String, Object> firstMenu);
	
	Map<String, Object> querySecondMenuById(String id);
	
	int updateSecondMemu(Map<String, Object> secondMenu);
	
	int deleteSecondMenu(String secondMenuId);
	
	int deleteRoleSecondMenu(Map<String, Object> record);
}
