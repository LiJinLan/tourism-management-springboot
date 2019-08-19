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
	var token = cookie.get("tourism_token");
	console.log("token:"+token);
	$("#Authorization").val(token);
	
	$("#submitId").bind('click',function(){
		var Authorization = cookie.get("tourism_token");
		console.log("Authorization:"+Authorization);
		$("#Authorization").val(Authorization);
		var formData = new FormData($('#uploadForm')[0]);
    $.ajax({
    	type: "POST",
        url: "/common/flie/multiUpload.action",
        data: formData,
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        beforeSend: function (XMLHttpRequest) {
   		XMLHttpRequest.setRequestHeader("Authorization", Authorization);
       },
        success: function (data) {
        	alert(data);
        },error:function(error){
        	alert("上传失败");
        }
    });
	});
});
</script>
<body> 

	
	<form id="uploadForm"  enctype="multipart/form-data" >     
           <p>文件1：<input type="file" name="file" /></p>    
           <p>文件2：<input type="file" name="file" /></p>    
           <p>文件3：<input type="file" name="file" /></p>
           <input type='hidden' value="" id="Authorization" name="Authorization">     
           <p><input id="submitId" type="submit" value="上传" /></p>    
       </form>    


</body>





</html>