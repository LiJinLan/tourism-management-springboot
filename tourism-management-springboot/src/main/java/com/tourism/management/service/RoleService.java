package com.tourism.management.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tourism.management.mapper.RoleDao;
import com.tourism.management.util.FileUtil;

@Service
@Transactional
public class RoleService {
	@Autowired
    private RoleDao roleDao;
	
    public int addRole(Map<String, Object> role) {
    	String name = (String)role.get("name");
    	List<Map<String, Object>> roleList = this.roleDao.queryRoleName(name);
        if (roleList.size() == 0) {
        	String roleId = String.valueOf(FileUtil.getTimestamp());
        	role.put("id", roleId); 
        	this.roleDao.addRole(role);
        	return 1;
        }else{
        	return -1;
        }
    }
	
    public List<Map<String, Object>> queryRoleByRole(String roleId) {
    	return this.roleDao.queryRoleByRole(roleId);
    }
    
    public List<Map<String, Object>> queryRoleAll() {
    	return this.roleDao.queryRoleAll();
    }
    
    public int updateRole(Map<String, Object> role) {
    	String roleId = (String)role.get("id");
    	List<Map<String, Object>> roleList = this.roleDao.queryRoleByRole(roleId);
    	if(roleList.size() == 0) {
    		return -1;
    	}else {
    		this.roleDao.updateRole(role);  
        	return 1;
    	}
    }
    
    public int deleteRoleById(String id) {
    	List<Map<String, Object>> roleList = this.roleDao.queryRoleByRole(id);
        if (roleList == null) {
            return -1;
        } else {
        	 this.roleDao.deleteRoleById(id);
        	 return 1;
        }
    }
}
