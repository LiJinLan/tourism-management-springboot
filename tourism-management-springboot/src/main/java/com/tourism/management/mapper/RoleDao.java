package com.tourism.management.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RoleDao {
	
	int addRole(Map<String, Object> role);
	
	List<Map<String, Object>> queryRoleName(String name);
	
	List<Map<String, Object>> queryRoleByRole(String roleId);
	
	List<Map<String, Object>> queryRoleAll();
	
	int updateRole(Map<String, Object> role);
	
	int deleteRoleById(String id);
}
