package com.tourism.management.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDao {

    int addUser(Map<String, Object> user);


    Map<String, Object> queryUserByNamePwd(Map<String, Object> user);
    
    
    Map<String, Object> queryUserById(String userId);
    
    List<Map<String, Object>> queryUserByName(String userName);
    
    int updateUserPassword(Map<String, Object> updateObj);
    
    int updateUser(Map<String, Object> updateObj);
    
    int updataUserRoleId(Map<String, Object> user);
    
    List<Map<String, Object>> queryUserAll();
    
}
