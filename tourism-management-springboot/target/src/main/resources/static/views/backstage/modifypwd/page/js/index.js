//修改密码提交
function passwordUpdate() {
	var getUser = getCookie("user");
	var getUserStr = JSON.parse(getUser);
	//var user = getUserStr.data.user;
	//var getName = user.name;
	//var getPassword = user.password;
	

	var getName = getUserStr.name;
	var getPassword = getUserStr.password;


	
	var password = $(".password-xg input[name='oldpwd']").val();
	var newPassword = $(".password-xg input[name='newpwd1']").val();
	var confirmPwd = $(".password-xg input[name='newpwd2']").val();

	if(newPassword.length < 6) {
		return false;
	};
	if(confirmPwd.length < 6) {
		return false;
	}else {
		if(newPassword != confirmPwd) {
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
	    		$(".password-xg input[name='oldpwd']").val('');
	    		$(".password-xg input[name='newpwd1']").val('');
	    		$(".password-xg input[name='newpwd2']").val('');
	    	}else{
	    		pnotify("失败", "原始密码不正确", "error");
	    	}
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "找不到相应的用户信息", "error");
	    }
	});
}

