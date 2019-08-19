package com.tourism.management.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tourism.management.mapper.UserDao;

@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserDao userDao;

    /**
     * 添加用户
     * 
     * @param user
     *
     */
    public int addUser(Map<String, Object> user) {
/*    	user = formatUser(user);*/
    	String userName = String.valueOf(user.get("name"));
    	List<Map<String, Object>> userList = this.userDao.queryUserByName(userName);
        if (userList.size() == 0) {
        	 this.userDao.addUser(user);
        	 return 1;
        } 
        return -1;
    }
    
    /**
     * 根据用户名和密码查询用户
     * 
     * @param user
     * 
     */
    public Map<String, Object> queryUserByNamePwd(Map<String, Object> user) {
    	return this.userDao.queryUserByNamePwd(user);
    }


    public Map<String, Object> queryUserById(String userId) {
    	return this.userDao.queryUserById(userId);  
    }

    public List<Map<String, Object>> queryUserByName(String userName) {
    	return this.userDao.queryUserByName(userName);  
    }
    
    public int updateUserPassword(Map<String, Object> userObj) {
    	Map<String, Object> oldUser = userDao.queryUserByNamePwd(userObj);
    	if(oldUser == null) {
    		return -1;
    	}else {
    		Map<String, Object> updateObj = new HashMap<String, Object>();
        	updateObj.put("password",userObj.get("newPassword"));
        	updateObj.put("id", oldUser.get("id"));
    		this.userDao.updateUserPassword(updateObj);  
        	return 1;
    	}
    }
    
    public int updateUser(Map<String, Object> userObj) {
    	String userName = (String)userObj.get("name");
    	List<Map<String, Object>> oldUser = userDao.queryUserByName(userName);
    	if(oldUser == null) {
    		return -1;
    	}else {
    		Map<String, Object> updateObj = new HashMap<String, Object>();
        	updateObj.put("name",userObj.get("name"));
        	updateObj.put("realName",userObj.get("realName"));
        	updateObj.put("sex",userObj.get("sex"));
        	updateObj.put("birthday",userObj.get("birthday"));
        	updateObj.put("address",userObj.get("address"));
        	updateObj.put("telephone",userObj.get("telephone"));
        	updateObj.put("idCard",userObj.get("idCard"));
        	updateObj.put("email",userObj.get("email"));
    		this.userDao.updateUser(updateObj);  
        	return 1;
    	}
    }
    
    public int updataUserRoleId(List<Map<String, Object>> userArray) {
        if (userArray.size() == 0) {
            return -1;
        } else {
        	for(int i = 0; i< userArray.size(); i++) {
        		Map<String, Object> user = userArray.get(i);
	        	this.userDao.updataUserRoleId(user);
        	}
        	return 1;
        }
    }
    
    public List<Map<String, Object>> queryUserAll() {
    	return this.userDao.queryUserAll();
    }
}
