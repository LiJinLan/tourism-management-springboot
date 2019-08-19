package com.tourism.management.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ScenicDao {
	int addScenic(Map<String, Object> scenic);
	
	List<Map<String, Object>> queryScenicByName(String name);
	
	List<Map<String, Object>> queryScenicRecommend(Map<String, Object> queryScenicSqlObj);
	
	Map<String, Object> queryScenicByNameCity(Map<String, Object> scenic);
	
	Map<String, Object> queryScenicFileByFileId(String fileId);
	
	List<Map<String, Object>> queryScenicAll();
	
	Map<String, Object> queryScenicById(String id);
	
	int deleteScenicById(String id);
	
	int updateScenic(Map<String, Object> scenicObj);
	
	int updateFile(Map<String,Object> fileMap);
	
	int addScenicFile(Map<String,Object> scenicFile);
	
	List<Map<String, Object>> queryFileByScenicId(String id);
	
	int updateScenicFileById(Map<String, Object> scenicObj);
	
}
