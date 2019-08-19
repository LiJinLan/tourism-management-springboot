package com.tourism.management.mapper;


import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface FileDao {

    int addFile(Map<String,Object> map);
    
}
