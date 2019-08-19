$(function() {
	var getUser = getCookie("user");
	var getUserStr = JSON.parse(getUser);
	var getName = getUserStr.data.name;
	var getPassword = getUserStr.data.password;
	var getEmail = getUserStr.data.email;
	
	$(".name span").text(getName);
	$(".password span").text(getPassword);
	$(".email span").text(getEmail);
})