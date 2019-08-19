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
	<jsp:include page="../commons/common.jsp" />
   <title>主页面</title>
   </head>
    <script type="text/javascript">
	
$(document).ready(function(){
	
	$("#logout").bind('click',function(){
		var token = cookie.get("tourism_token");
		var userName = cookie.get("tourism_userName");
		console.log("token:"+token);
		console.log("userName:"+userName);
		cookie.Delete("tourism_token");
		cookie.Delete("tourism_userName");
		 $.ajax({
	            type: "post",
	            url:"/user/logonOut.action",
	            contentType: "application/json;charset=utf-8",
	            data :JSON.stringify({"userId":userName}),
	            dataType: "json",
	            beforeSend: function (XMLHttpRequest) {
	       		XMLHttpRequest.setRequestHeader("Authorization", token);
	           },
	            success: function (data) {
	            	window.location.href = '/user/logonIndex.action';
	            },error:function(error){
	            	window.location.href = '/user/logonIndex.action';
	            }
	        });
	});

	
});
</script>
   
  
<body> 

	
<div >
    <div  style="color:red"> XXX系统欢迎你</div>
    <div  style="color:red">token为：  ${token}</div>
    <div  style="color:red"><a id="logout" href="#">登出</a></div>
    <div  style="color:red"><a href="/user/upload.action">上传文件</a></div>
   
</div>

</body>





</html>