package com.tourism.management.controller;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONObject;
import com.tourism.management.constant.Constant;
import com.tourism.management.pojo.User;
import com.tourism.management.util.RedisUtil;

@RequestMapping("common")
@Controller
public class CommonController {
	
    @Autowired
    private RedisUtil redisUtil;

    
    
    /**
     * 登录页面
     * 
     *
     * @return
     */
    @RequestMapping(value = "main", method = RequestMethod.POST)
    public ModelAndView logonindex( HttpServletRequest request,
            HttpServletResponse response,Model model) { 
    			ModelAndView mv = new ModelAndView("main");
    			String token = request.getParameter(Constant.TOKEN_NAME);
    			User user = JSONObject.parseObject(redisUtil.get(token,null),User.class);
    			String userName = user.getUserId();
    			model.addAttribute("token", token);
    			model.addAttribute("userName", userName);
                return mv;
    }

}
