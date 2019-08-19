package com.tourism.management.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.tourism.management.constant.Constant;
import com.tourism.management.exception.UnlogonException;
import com.tourism.management.pojo.User;
import com.tourism.management.util.RedisUtil;
/**
 * 全局拦截器
 * @author devinli
 *
 */
@Component
public class UserLoginHandlerInterceptor implements HandlerInterceptor {
	
    @Autowired
    private RedisUtil redisUtil;


	/**
	 * Controller之前执行
	 */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String token = request.getParameter(Constant.TOKEN_NAME);
        if(StringUtils.isEmpty(token)) {
        	token = request.getHeader(Constant.TOKEN_NAME);
        }
        if (StringUtils.isEmpty(token)) {
            // 未登录状态
            return true;
        }
        User user = JSONObject.parseObject(redisUtil.get(token,null),User.class);
        if (null == user) {
        	throw new UnlogonException();
        }
        return true;
    }
    /**
     * Controller之后执行
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception {

    }
    /**
     * 渲染了对应的视图之后才执行（即modelAndView）
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
            Exception ex) throws Exception {
    }

}
