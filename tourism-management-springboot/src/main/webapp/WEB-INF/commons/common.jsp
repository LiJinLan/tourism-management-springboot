<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<script type="text/javascript" src="/script/jquery.min.js"></script>
<script type="text/javascript" src="/script/jquery.js"></script>
<script type="text/javascript" src="/script/cookie.js"></script>


<script type="text/javascript">
$(document).ready(function(){
	var tokenFromCon = '${token}';
	if(tokenFromCon!='' && tokenFromCon!=null && typeof(tokenFromCon)!='undefined'){
		debugger
	var token = '${token}';
	var userName = '${userName}';
	cookie.set("tourism_token",token,1);
	cookie.set("tourism_userName",userName,1);
	console.log("token:"+cookie.get("tourism_token"));
	console.log("tourism_userName:"+cookie.get("tourism_userName"));
	setCookieFlag = true;
	}else{
		debugger
		var token = cookie.get("tourism_token");
		var userName = cookie.get("tourism_userName");
		if(token =='' || userName==''){
			window.location.href = '/user/logonIndex.action';
		}
	}
	//$(window).bind('unload',function(){
	//	alert("11111111");
	//	cookie.Delete("tourism_token");
	//	cookie.Delete("tourism_userName");
	//});
});
</script>