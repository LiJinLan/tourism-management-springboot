package com.tourism.management.config;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.util.http.fileupload.FileUploadBase.SizeLimitExceededException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.ModelAndView;

import com.tourism.management.exception.TourismException;
import com.tourism.management.exception.UnlogonException;
/**
 * 全局异常处理
 * RestControllerAdvice相当于ControllerAdvice和ResponseBody注解组合
 * @author devinli
 *
 */
@RestControllerAdvice 
public class GlobalExceptionHandler {

    /**
     * 业务异常
     * @param request
     * @param exception
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value=TourismException.class)  
    public Map allExceptionHandler(HttpServletRequest request,  
    		TourismException exception)  
    {  
       Map<String,Object> returnMap = new HashMap<>(); 
       returnMap.put("code", exception.getCode());
       returnMap.put("desc", exception.getDesc());
        return returnMap;  
    }  
    
    /**
     * 业务异常
     * @param request
     * @param exception
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value=UnlogonException.class)  
    public ModelAndView  unlogonExceptionHandler(HttpServletRequest request,  
    		UnlogonException exception)  
    {  
    	ModelAndView mv = new ModelAndView("logon");

        return mv;  
    }  
    /**
     * 业务异常
     * @param request
     * @param exception
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value=SizeLimitExceededException.class)  
    public Map  fileSizeLimit(HttpServletRequest request,  
    		SizeLimitExceededException exception)  
    {  
    	Map<String,Object> returnMap = new HashMap<>(); 
        returnMap.put("code", "9999");
        returnMap.put("desc", "上传文件超大最大值！");
         return returnMap;  

    } 
    
    /**
     * 业务异常
     * @param request
     * @param exception
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value=MultipartException.class)  
    public Map  fileSizeLimit(HttpServletRequest request,  
    		MultipartException exception)  
    {  
    	Map<String,Object> returnMap = new HashMap<>(); 
        returnMap.put("code", "9999");
        returnMap.put("desc", "上传文件超大最大值！");
         return returnMap;  

    } 
    
    
    

}

