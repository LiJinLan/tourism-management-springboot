package com.tourism.management.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tourism.management.mapper.SearchDao;

@Service
@Transactional
public class SearchService {
	@Autowired
	private SearchDao searchDao;
    public Map<String, Object> searchByKeyWord(Map<String, Object> search) {
    	String keyWord = (String)search.get("keyWord");
    	String newKeyWord = "%"+ keyWord +"%";
    	String type = (String)search.get("type");
    	Map<String,Object> searchMap = new HashMap<String, Object>();
    	if(type.equals("hotel")){
    		List<Map<String, Object>> hotel = searchDao.searchHotel(newKeyWord);
    		searchMap.put("hotel", hotel);
    	}
    	else if(type.equals("line")){
    		List<Map<String, Object>> line = searchDao.searchLine(newKeyWord);
    		searchMap.put("line", line);
    	}
    	else if(type.equals("scenic")){
    		List<Map<String, Object>> scenic = searchDao.searchScenic(newKeyWord);
    		searchMap.put("scenic", scenic);
    	}
    	else if(type.equals("all")){
    		List<Map<String, Object>> hotel = searchDao.searchHotel(newKeyWord);
    		List<Map<String, Object>> line = searchDao.searchLine(newKeyWord);
    		List<Map<String, Object>> scenic = searchDao.searchScenic(newKeyWord);
        	searchMap.put("line", line);
        	searchMap.put("hotel", hotel);
        	searchMap.put("scenic", scenic);
    	}
    	return searchMap;
    }
}
