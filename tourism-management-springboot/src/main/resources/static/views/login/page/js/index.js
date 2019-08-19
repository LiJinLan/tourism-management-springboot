function userlogin() {		//当点击登录按钮，触发函数
	var userName = $("#loginname").val();
	var password = $("#loginpwd").val();
	var reqData = {
		"name" : userName,
		"password":password
	};
	if(userName.length == 0) { 
		alert("用户名不能为空！");
		return false;
	}
	if(password.length == 0) {
		alert("密码不能为空！");
		return false;
	}
	
	 $.ajax({
		url: "http://127.0.0.1:8086/user/queryUserByNamePwd",
		type: "POST",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		data: JSON.stringify(reqData),//stringify是指从一个对象中解析出字符串
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				setCookie("user", JSON.stringify(data.data.user) );
				//setCookie("menu", JSON.stringify(data.data.menu) );
				setCookie("firstMenuId","user-index-page");
                var $txt = '<a class="dl" style="padding:0" href="javascript:;">你好,</a>';
                $txt+= '<a class="dl" href="/member/">'+data.data.user.name+'</a>';//路径错误
                $txt+= '<a class="dl" href="/member/login/loginout">退出</a>';//路径错误
                
                $("#loginstatus").html($txt);
				window.location.href = "../../frontmana/index/page/index.html";
			}else{
				pnotify("登录失败", "用户名或密码错误", "error");
			}
		},
		error: function errorCallBack(we) {
			console.log("error");
		}
	});
}


/*注册的函数，目前用不到
function register() {
	window.location.href = "../../register/register.html";
}
*/