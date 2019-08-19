$(function(){
	$.idcode.setCode();
})


function login() {
	var userName = $("#username").val();
	var password = $("#password").val();
	var IsBy = $.idcode.validateCode();
	var reData = {
		"id": getId(),
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
	if(IsBy){
		
	}else{
		alert("请输入正确的验证码");
		return false;
	}
	$.ajax({
		url: "http://127.0.0.1:8086/user/addUser",
		type: "POST",
		contentType: "applicatin/json",
		data: JSON.stringify(reqData),
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				setCookie("user", JSON.stringify(data) );
				window.location.href = "../backmana/index/index.html";
			}else{
				alert("用户名或密码错误");
				pnotify("失败", "登录失败", "error");
			}
		},
		error: function errorCallBack(we) {
			console.log("error");
		}
	});
}

function register() {
	window.location.href = "../register/register.html";
}