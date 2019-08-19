package com.tourism.management.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.tourism.management.mapper.ScenicDao;
import com.tourism.management.util.FileUtil;

@Service
@Transactional
public class ScenicService {
	@Autowired
	private ScenicDao scenicDao;
	
	 /**
     * 添加景点
     * 
     * @param scenic
     *
     */
    public int addScenic(Map<String, Object> scenic) {
    	String name = String.valueOf(scenic.get("name"));
    	List<Map<String, Object>> scenicList = this.scenicDao.queryScenicByName(name);
        if (scenicList.size() == 0) {
        	String scenicId = String.valueOf(FileUtil.getTimestamp());
        	scenic.put("id", scenicId); 
        	scenic.put("type", "scenic");
        	this.scenicDao.addScenic(scenic);
        	
        	List<Object> fileIds = (List<Object>)scenic.get("fileIds");

        	for(int i = 0;i< fileIds.size(); i++) {
        		Map<String,Object> fileMap = new HashMap<>();
            	fileMap.put("id",FileUtil.getTimestamp());
            	fileMap.put("scenicId",scenicId);
            	fileMap.put("fileId",String.valueOf(fileIds.get(i)));
            	this.scenicDao.addScenicFile(fileMap);
        	}
        	
        	return 1;
        } 
        return -1;
    }
    
    public Map<String, Object> queryScenicByNameCity(Map<String, Object> scenic) {
    	return this.scenicDao.queryScenicByNameCity(scenic);
    }
    
    public List<Map<String, Object>> queryScenicAll() {
    	return this.scenicDao.queryScenicAll();  
    }
    
    public Map<String, Object> queryScenicById(String id) {
    	return this.scenicDao.queryScenicById(id);  
    }
    
    public int deleteScenicById(String id) {
    	Map<String, Object> scenicList = scenicDao.queryScenicById(id);
        if (scenicList == null) {
            return -1;
        } else {
        	 this.scenicDao.deleteScenicById(id);
        	 return 1;
        }
    }
    
    public int updateScenic(JSONObject scenicJson) {
    	JSONObject scenicObj = new JSONObject(scenicJson);   
    	JSONObject newScenic = scenicObj.getJSONObject("scenic");
    	
    	String id = (String)newScenic.get("id");
    	Map<String, Object> oldScenic = scenicDao.queryScenicById(id);
    	if(oldScenic == null) {
    		return -1;
    	}else {
    		this.scenicDao.updateScenic(newScenic);
    		
    		
    		JSONArray scenicFileArray =  scenicObj.getJSONArray("scenicFile");
    		for(int i = 0;i< scenicFileArray.size(); i++) {
    			Map<String,Object> newScenicFile = scenicFileArray.getJSONObject(i); 
    			String oldFileId = (String)newScenicFile.get("oldFileId");
    			Map<String,Object> oldScenicFile = this.scenicDao.queryScenicFileByFileId(oldFileId);
    			String newFileId = (String)newScenicFile.get("newFileId");
    			oldScenicFile.put("fileId", newFileId);
            	this.scenicDao.updateScenicFileById(oldScenicFile);
    		}
        	return 1;
    	}
    }
    
    public List<Map<String, Object>> queryFileByScenicId(String id) {
    	return this.scenicDao.queryFileByScenicId(id);
    }
    
    
    public List<Map<String, Object>> queryScenicRecommend( Map<String, Object> choiceObj) {
    	String scenicRecomStr = "";
    	boolean flag = false;
    	for( String key: choiceObj.keySet()) {
    		if(key == "grade") {
    			flag = true;
    			if(scenicRecomStr != "") {
    				scenicRecomStr = scenicRecomStr + " and ";
    			}
    			scenicRecomStr = scenicRecomStr + key + "='" + choiceObj.get(key) + "'";
    		}
    		if(key == "salePrice") {
    			flag = true;
    			if(scenicRecomStr != "") {
    				scenicRecomStr = scenicRecomStr + " and ";
    			}
    			switch(String.valueOf(choiceObj.get(key))) {
	    			case "100元以下" :
	    				scenicRecomStr = scenicRecomStr + "salePrice<100 ";
	    				break;
	    			case "100-200元" :
	    				scenicRecomStr = scenicRecomStr + "(salePrice>=100 and salePrice<200) ";
	    				break;
	    			case "200-400元" :
	    				scenicRecomStr = scenicRecomStr + "(salePrice>=200 and salePrice<400) ";
	    				break;
	    			case "400-600元" :
	    				scenicRecomStr = scenicRecomStr + "(salePrice>=400 and salePrice<600) ";
	    				break;
	    			case "600元以上" :
	    				scenicRecomStr = scenicRecomStr + "salePrice>=600 ";
	    				break;
    			}
    		}
    		if(key == "address") {
    			flag = true;
    			if(scenicRecomStr != "") {
    				scenicRecomStr = scenicRecomStr + " and ";
    			}
    			scenicRecomStr = scenicRecomStr + key + " like '%" + choiceObj.get(key) + "%'";
    		}
    	}
    	
    	if(flag) {
    		Map<String, Object> queryScenicSqlObj = new HashMap<String, Object>();
    		String xml_sql = "select * from scenic where " + scenicRecomStr;
    		queryScenicSqlObj.put("EXE_SQL", xml_sql);
    		return this.scenicDao.queryScenicRecommend(queryScenicSqlObj);
    	} else {
    		return this.scenicDao.queryScenicAll();
    	}
    }
}




