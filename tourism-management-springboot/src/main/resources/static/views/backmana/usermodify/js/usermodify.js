$(function() {
	var getUser = getCookie("user");
	var getUserStr = JSON.parse(getUser);
	var user = getUserStr.data.user;
	var getName = user.name;
	var getRealName = user.realName;
	var getSex = user.sex;
	var getBirthday = user.birthday;
	var getAddress = user.address;
	var getTelephone = user.telephone;
	var getIdCard = user.idCard;
	var getEmail = user.email;
	
	$(".usermodify span").text(getName);
	$(".usermodify input[name='realname']").val(getRealName);
	$(".usermodify input[name='sex']").val(getSex);
	$(".usermodify input[name='birthday']").val(getBirthday);
	$(".usermodify input[name='address']").val(getAddress);
	$(".usermodify input[name='telephone']").val(getTelephone);
	$(".usermodify input[name='idcard']").val(getIdCard);
	$(".usermodify input[name='email']").val(getEmail);
})

//修改用户信息提交
function userUpdate() {
	var getUser = getCookie("user");
	var getUserStr = JSON.parse(getUser);
	var user = getUserStr.data.user;
	var getName = user.name;
	var getPassword = user.password;
	var getRealName = $(".usermodify input[name='realname']").val();
	var getSex = $(".usermodify input[name='sex']").val();
	var getBirthday = $(".usermodify input[name='birthday']").val();
	var getAddress = $(".usermodify input[name='address']").val();
	var getTelephone = $(".usermodify input[name='telephone']").val();
	var getIdCard = $(".usermodify input[name='idcard']").val();
	var getEmail = $(".usermodify input[name='email']").val();

	var userData = {
		"name": getName,
		"password": getPassword,
		"realName": getRealName,
		"sex": getSex,
		"birthday": getBirthday,
		"address": getAddress,
		"telephone": getTelephone,
		"idCard": getIdCard,
		"email": getEmail
	};

	$.ajax({
	    url: "http://127.0.0.1:8086/user/updateUser",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(userData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true){
	    		pnotify("成功", "修改用户信息成功", "success");
	    	}
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "找不到相应的用户信息", "error");
	    }
	});
}

