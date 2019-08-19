$(function() {
	var userInfoStr = getCookie("user");
	var userInfo = JSON.parse(userInfoStr);
	var username = userInfo.data.user.name;
	$(".welcome p").text("尊敬的" + username + "用户，欢迎您使用旅游管理系统！");
})  