$(function() {
	var getUser = getCookie("user");
	var getUserStr = JSON.parse(getUser);
	var user = getUserStr.data.user;
	var getName = user.name;
	var getPassword = user.password;
	
	$(".pwdmodify span").text(getName);

});


//修改密码提交
function passwordUpdate() {
	var getUser = getCookie("user");
	var getUserStr = JSON.parse(getUser);
	var user = getUserStr.data.user;
	var getName = user.name;
	var getPassword = user.password;
	
	$(".pwdmodify span").text(getName);
	var password = $(".pwdmodify input[name='password']").val();
	var newPassword = $(".pwdmodify input[name='newPassword']").val();
	var confirmPwd = $(".pwdmodify input[name='confirmPwd']").val();

	if(newPassword.length == 0) {
		alert("密码不能为空！");
		return false;
	};
	if(confirmPwd.length == 0) {
		alert("确认密码不能为空！");
		return false;
	}else {
		if(newPassword != confirmPwd) {
			alert("两次密码不一致！");
			return false;
		}
	};

	var pwdData = {
	"name": getName,
	"password": password,
	"newPassword": newPassword
	};

	$.ajax({
	    url: "http://127.0.0.1:8086/user/updateUserPassword",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(pwdData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true){
	    		pnotify("成功", "修改密码成功", "success");
	    	}
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "找不到相应的用户信息", "error");
	    }
	});
}

