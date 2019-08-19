package com.tourism.management.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tourism.management.mapper.FileDao;

@Service
@Transactional
public class FileService {
   
    @Autowired
    private FileDao fileDao;

    /**
      * 记录上传文件的数据
     * 
     * @param 
     */
    public void addFileRecord(List<Map<String,Object>> fileList) {
    	for(Map<String,Object> item : fileList) {
        	fileDao.addFile(item);
    	}
    }
    
}
