<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
   <meta http-equiv="pragma" content="no-cache">
   <meta http-equiv="cache-control" content="no-cache">
   <meta http-equiv="expires" content="0"> 
   <meta name="format-detection" content="telephone=no">  
   <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"> 
   <meta name="format-detection" content="telephone=no">
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <jsp:include page="../commons/security.jsp" />
   <title>登录页面</title>
   </head>
    <script>
    function fun1(){
       var userId = $("#userId").val();
 	   var userPassword = $("#userPassword").val();
 	   if(userId==''){
 		   alert("用户名为空");
 		   return;
 	   }
 	   if(userPassword==''){
 		   alert("密码为空");
 		   return;
 	   }
 	   if(userPassword.length<6){
 		   alert("密码长度小于6");
 		   return;
 	   }
 	   if(!userPassword.match(/[A-Za-z0-9]+/)){
 		   alert("密码不合法");
 		   return;
 	   }
 	  setPassword(userPassword);
 	  var encryptedPassword = getEncryptedPassword().toUpperCase();
 	   
 	   $.ajax({
            type: "post",
            url:"/user/logon.action",
            contentType: "application/json;charset=utf-8",
            data :JSON.stringify({"userId":userId,"userPassword":encryptedPassword}),
            dataType: "json",
            success: function (data) {
            	 var OAuth = data.OAuth;
            	 var result = data.result;
            	 if(result==1){
            		 StandardPost(OAuth);
            	 }else{
            		 alert("用户名或者密码错误！");
            	 }
            },error:function(error){
            	alert("登录异常！");
            }
        });
    }
    
    function StandardPost(args) 
    {
    	$("#Authorization").val(args);
    	document.getElementById("form").submit();
    	
    }

    </script>
  
<body> 

	
<div >
    <div >用户名：<input type="text"  value="" id="userId" name="userId" ></div>
    <div >密码：<input type="password" value="" id="userPassword" name="userPassword"></div>
    <div><input type="button"  value="提交" id="submitId"  onclick="fun1()"><a href="/user/registIndex.action">未注册请点击</a></div>
</div>
<form name="form" id="form" method='post' action="/common/main.action">
<input type='hidden' value="" id="Authorization" name="Authorization">
<input type="button"  value="提交" id="buttonId"  style="display:none">
</form>
</body>





</html>