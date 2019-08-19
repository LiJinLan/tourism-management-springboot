package com.tourism.management.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.tourism.management.mapper.HotelDao;
import com.tourism.management.util.FileUtil;

@Service
@Transactional
public class HotelService {
	@Autowired
	private HotelDao hotelDao;
	
	/**
     * 添加酒店
     * 
     * @param hotel
     *
     */
    public int addHotel(Map<String, Object> hotel) {
    	String name = String.valueOf(hotel.get("name"));
    	List<Map<String, Object>> hotelList = this.hotelDao.queryHotelByName(name);
        if (hotelList.size() == 0) {
        	String hotelId = String.valueOf(FileUtil.getTimestamp());
        	hotel.put("id", hotelId); 
        	this.hotelDao.addHotel(hotel);
        	
        	List<Object> fileIds = (List<Object>)hotel.get("fileIds");

        	for(int i = 0;i< fileIds.size(); i++) {
        		Map<String,Object> fileMap = new HashMap<>();
            	fileMap.put("id",FileUtil.getTimestamp());
            	fileMap.put("hotelId",hotelId);
            	fileMap.put("fileId",String.valueOf(fileIds.get(i)));
            	fileMap.put("type", "hotel");
            	this.hotelDao.addHotelFile(fileMap);
        	}
        	
        	return 1;
        } 
        return -1;
    }
    
    public Map<String, Object> queryHotelByNameCity(Map<String, Object> hotel) {
    	return this.hotelDao.queryHotelByNameCity(hotel);
    }
    
    public List<Map<String, Object>> queryHotelAll() {
    	return this.hotelDao.queryHotelAll();  
    }
    
    public Map<String, Object> queryHotelById(String id) {
    	return this.hotelDao.queryHotelById(id);  
    }
    
    public int deleteHotelById(String id) {
    	Map<String, Object> hotelList = hotelDao.queryHotelById(id);
        if (hotelList == null) {
            return -1;
        } else {
        	 this.hotelDao.deleteHotelById(id);
        	 return 1;
        }
    }
    
    public int updateHotel(JSONObject hotelJson) {
    	JSONObject hotelObj = new JSONObject(hotelJson); 
    	JSONObject newHOtel = hotelObj.getJSONObject("hotel");
    	String id = (String)newHOtel.get("id");
    	Map<String, Object> oldhotel = hotelDao.queryHotelById(id);
    	if(oldhotel == null) {
    		return -1;
    	}else {
    		this.hotelDao.updateHotel(newHOtel);
    		JSONArray hotelFileArray =  hotelObj.getJSONArray("hotelFile");
    		for(int i = 0;i< hotelFileArray.size(); i++) {
    			Map<String,Object> newHotelFile = hotelFileArray.getJSONObject(i);
    			String oldFileId = (String)newHotelFile.get("oldFileId");
    			Map<String,Object> oldHotelFile = this.hotelDao.queryHotelFileByFileId(oldFileId);
    			String newFileId = (String)newHotelFile.get("newFileId");
    			oldHotelFile.put("fileId", newFileId);
            	this.hotelDao.updateHotelFileById(oldHotelFile);
    		}
        	return 1;
    	}
    }
    
    public List<Map<String, Object>> queryFilesByHotelId(String hotelId) {
    	return this.hotelDao.queryFilesByHotelId(hotelId);
    }
    
    public List<Map<String, Object>> queryHotelRecommend( Map<String, Object> choiceObj) {
    	String hotelRecomStr = "";
    	boolean flag = false;
    	for(String key : choiceObj.keySet()) {
    		if(key == "grade") {
    			flag = true;
    			hotelRecomStr = hotelRecomStr + key + "='" + choiceObj.get(key) + "'";
    		}
    		if(key == "salePrice") {
    			flag = true;
    			if(hotelRecomStr != "") {
    				hotelRecomStr = hotelRecomStr + " and ";
    			}
    			switch(String.valueOf(choiceObj.get(key))) {
	    			case "100元以下" :
	    				hotelRecomStr = hotelRecomStr + "salePrice<100 ";
	    				break;
	    			case "100-200元" :
	    				hotelRecomStr = hotelRecomStr + "(salePrice>=100 and salePrice<200) ";
	    				break;
	    			case "200-400元" :
	    				hotelRecomStr = hotelRecomStr + "(salePrice>=200 and salePrice<400) ";
	    				break;
	    			case "400-600元" :
	    				hotelRecomStr = hotelRecomStr + "(salePrice>=400 and salePrice<600) ";
	    				break;
	    			case "600元以上" :
	    				hotelRecomStr = hotelRecomStr + "salePrice>=600 ";
	    				break;
    			}
    		}
    		if(key == "homeType") {
    			flag = true;
    			if(hotelRecomStr != "") {
    				hotelRecomStr = hotelRecomStr + " and ";
    			}
    			hotelRecomStr = hotelRecomStr + key + "='" + choiceObj.get(key)+ "'";			
    		}
    		if(key == "address") {
    			flag = true;
    			if(hotelRecomStr != "") {
    				hotelRecomStr = hotelRecomStr + " and ";
    			}
    			hotelRecomStr = hotelRecomStr + "address like '%" + choiceObj.get(key) + "%'";	
    		}
    		
    	}
    	if(flag) {
    		String xml_sql = "select * from hotel where " + hotelRecomStr;
    		Map<String, Object> queryHotelSqlObj = new HashMap<String, Object>();
    		queryHotelSqlObj.put("EXE_SQL", xml_sql);
    		return this.hotelDao.queryHotelRecommend( queryHotelSqlObj );
    	} else {
    		return this.hotelDao.queryHotelAll();
    	}
    	
    }
    
    
    
}
