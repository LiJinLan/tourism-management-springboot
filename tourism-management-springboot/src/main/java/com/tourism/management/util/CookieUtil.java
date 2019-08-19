package com.tourism.management.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;

public class CookieUtil {
	
	public static void delCookie(String name,HttpServletRequest request,HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();
        if(null!=cookies){
		for(Cookie cookie : cookies){
            if(cookie.getName().equals(name)){
                cookie.setValue(null);
                cookie.setMaxAge(0);// 立即销毁cookie
                cookie.setPath("/");
                response.addCookie(cookie);
                break;
            }
        }
        }
		
	}
	
	public static void addCookie(String name,String value ,HttpServletResponse response ,int minute) {
		
	 Cookie cookie = new Cookie(name.trim(), value.trim());
     cookie.setMaxAge(minute* 60);
     cookie.setPath("/");
     response.addCookie(cookie);
		
	}
	
	public static void editCookie(String name,String value ,HttpServletRequest request,HttpServletResponse response ,int minute) {
		
		Cookie[] cookies = request.getCookies();
        if(null!=cookies){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals(name)){
                    cookie.setValue(value);
                    cookie.setPath("/");
                    cookie.setMaxAge(minute* 60);
                    response.addCookie(cookie);
                    break;
                }
            }
        }

			
		}
	public static String getCookie(String name,HttpServletRequest request,HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();
		String cookieValue =""; 
        if(null!=cookies){
		for(Cookie cookie : cookies){
            if(cookie.getName().equals(name)){
            	cookieValue = cookie.getValue();
            	if(!StringUtils.isEmpty(cookieValue)) {
            		 break;
            	}
            }
        }
        }
        return cookieValue;
		
	}

}
