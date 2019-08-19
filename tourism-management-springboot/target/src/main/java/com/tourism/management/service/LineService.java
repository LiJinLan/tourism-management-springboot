package com.tourism.management.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.tourism.management.mapper.LineDao;
import com.tourism.management.util.FileUtil;

@Service
@Transactional

public class LineService {
	@Autowired
	private LineDao lineDao;

	/**
	 * 添加线路
	 * 
	 * @param line
	 *
	 */
	public int addLine(JSONObject lineScheduleJson) {
		JSONObject lineSchedule = new JSONObject(lineScheduleJson); // 把路线行程json字符串转为对象
		JSONObject line = lineSchedule.getJSONObject("line");

		String name = String.valueOf(line.get("name"));
		List<Map<String, Object>> lineList = this.lineDao.queryLineByName(name);	//查询该线路是否已存在
		if (lineList.size() == 0) {
			String lineId = String.valueOf(FileUtil.getTimestamp());
			line.put("id", lineId);
			this.lineDao.addLine(line);

			JSONArray scheduleArray = lineSchedule.getJSONArray("schedule");

			for (int i = 0; i < scheduleArray.size(); i++) {
				Map<String, Object> schedule = scheduleArray.getJSONObject(i); // 获取schedule里的数组对象
				schedule.put("id", FileUtil.getTimestamp());
				schedule.put("lineId", lineId);
				this.lineDao.addSchedule(schedule);
			}
			return 1;
		}
		return -1;
	}

	public List<Map<String, Object>> queryLineAll() {
		return this.lineDao.queryLineAll();
	}

	public Map<String, Object> queryLineById(String id) {
		return this.lineDao.queryLineById(id);
	}

	public int deleteLineById(String id) {
		Map<String, Object> lineList = lineDao.queryLineById(id);
		if (lineList == null) {
			return -1;
		} else {
			this.lineDao.deleteLineById(id);
			return 1;
		}
	}

	public List<Map<String, Object>> queryLineScheduleByLineId(String lineId) {
		return this.lineDao.queryLineScheduleByLineId(lineId);
	}

	public int updateLine(JSONObject lineJson) {
		JSONObject lineObj = new JSONObject(lineJson);
		JSONObject newline = lineObj.getJSONObject("line");
		String id = (String) newline.get("id");
		Map<String, Object> oldline = lineDao.queryLineById(id);
		if (oldline == null) {
			return -1;
		} else {
			this.lineDao.updateLine(newline);
			JSONArray lineScheduleArray = lineObj.getJSONArray("schedule");
			for (int i = 0; i < lineScheduleArray.size(); i++) {
				Map<String, Object> newlineSchedule = lineScheduleArray.getJSONObject(i);
				this.lineDao.updateLineSchedule(newlineSchedule);
			}
			return 1;
		}
	}

	public List<Map<String, Object>> queryLineRecommend( Map<String, Object> choiceObj ) {
    	
    	String LineRecomStr = "";	//将勾选的查询条件拼接成一个字符串，查找数据库
    	//List< Map<String, Object> > lineRecomList = new ArrayList<>();
    	boolean flag = false;	//flag变量判断是否勾选查询条件，不勾选为false
    	for( String key : choiceObj.keySet() ) {	//循环对象，访问对象的属性，key为属性
    		if(key == "mealSign") {
    			LineRecomStr = LineRecomStr + key + "='" + choiceObj.get(key) + "'";
    			flag = true;
    		} 
    		
    		if( key == "day") {
    			flag = true;
    			if( LineRecomStr != "") {
    				LineRecomStr = LineRecomStr + " and ";
    			}
    				
    			switch( String.valueOf(choiceObj.get(key)) ){
	    			case "1天" : 
	    				LineRecomStr = LineRecomStr + key + "=1" ;
	    			    break;
	    			case "2天" :
	    				LineRecomStr = LineRecomStr + key + "=2";
	    			    break;
	    			case "3-5天" :
	    				LineRecomStr = LineRecomStr + "(day>=3 and day<=5)";
	    			    break;
	    			case "5天以上" :
	    				LineRecomStr = LineRecomStr + "day>5";
	    			    break;
	    			default :
	    				System.out.println("未知天数");
    			}
    		}
    		
    		if(key == "salePrice") {
    			flag = true;
    			if( LineRecomStr != "") {
    				LineRecomStr = LineRecomStr + " and ";
    			}
    			switch( String.valueOf(choiceObj.get(key)) ) {
	    			case "200元以下" :
	    				LineRecomStr = LineRecomStr + key + "<200";
	    				break;
	    			case "200-400元" :
	    				LineRecomStr = LineRecomStr + "(salePrice>=200 and salePrice<400)";
	    				break;
	    			case "400-600元" :
	    				LineRecomStr = LineRecomStr + "(salePrice>=400 and salePrice<=600)";
	    				break;
	    			case "600元以上" :
	    				LineRecomStr = LineRecomStr + key +">600";
	    				break;
	    			default :
	    				System.out.println("不合理价格");
    			}
    			
    		}
    		
    		if( key == "address"){
    			if( LineRecomStr != "") {
    				LineRecomStr = LineRecomStr + " and ";
    			}
    			flag = true;
    			LineRecomStr = LineRecomStr + key + " LIKE '%" + choiceObj.get(key) + "%'";
    			
    		}
    		
    		if( key == "orderBy") {
    			flag = true;
    			if( LineRecomStr != "") {
    				//LineRecomStr = LineRecomStr + " and ";
    				switch( String.valueOf(choiceObj.get(key))) {
	    				case "销量" :
	    					LineRecomStr = LineRecomStr + " ORDER BY tradeVolume DESC";
	    					break;
	    				case "综合" :
	    					LineRecomStr = LineRecomStr + " ORDER BY satisfaction DESC";
	    					break;
	    				default :
	    					System.out.println("不确定的排序");
    				}
    				Map<String, Object > queryLineRecObj = new HashMap<String, Object>();
    				String sqlOrderByStr = "select * from line inner join line_schedule on line.id = line_schedule.lineId where ";
    				String xml_Sql = sqlOrderByStr + LineRecomStr ;	//将查询条件和查询语句拼接成字符串，放到对象中，查询方法传参数为对象，xml中只要${属性名}即可拿到组装成的Sql语句
    		    	queryLineRecObj.put("EXE_SQL", xml_Sql);
    		    	return this.lineDao.queryLineRecommend( queryLineRecObj );
    				
    			} else {
    				
    				switch( String.valueOf(choiceObj.get(key))) {
	    				case "销量" :
	    					LineRecomStr ="ORDER BY tradeVolume DESC";
	    					break;
	    				case "综合" :
	    					LineRecomStr ="ORDER BY satisfaction DESC";
	    					break;
	    				default :
	    					System.out.println("不确定的排序");
    				}
    				Map<String, Object > queryLineRecObj = new HashMap<String, Object>();
    				String sqlOrderByStr = "select * from line ";
    				String xml_Sql = sqlOrderByStr + LineRecomStr ;	//将查询条件和查询语句拼接成字符串，放到对象中，查询方法传参数为对象，xml中只要${属性名}即可拿到组装成的Sql语句
    		    	queryLineRecObj.put("EXE_SQL", xml_Sql);
    		    	return this.lineDao.queryLineRecommend( queryLineRecObj );
    			}
    				
    		}
    	}
    	
    	Map<String, Object > queryLineRecObj = new HashMap<String, Object>();
    	String sqlStr = "select * from line inner join line_schedule on line.id = line_schedule.lineId where ";
    	String xml_Sql = sqlStr + LineRecomStr ;	//将查询条件和查询语句拼接成字符串，放到对象中，查询方法传参数为对象，xml中只要${属性名}即可拿到组装成的Sql语句
    	queryLineRecObj.put("EXE_SQL", xml_Sql);
    	
    	if(flag){
    	 
    		return this.lineDao.queryLineRecommend( queryLineRecObj );
    		 
    	} else {
    		return this.lineDao.queryLineAll();
    	}
	 
    }
    
}
