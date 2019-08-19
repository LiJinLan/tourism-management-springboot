$(function() {
	var getUser = getCookie("user");
	var getUserStr = JSON.parse(getUser);
	var user = getUserStr.data.user;
	var getName = user.name;
	var getRoleId = user.roleId;
	var getRealName = user.realName;
	var getSex = user.sex;
	var getBirthday = user.birthday;
	var getAddress = user.address;
	var getTelephone = user.telephone;
	var getIdCard = user.idCard;
	var getEmail = user.email;
	
	$(".name span").text(getName);
	$(".roleid span").text(getRoleId);
	$(".realname span").text(getRealName);
	$(".sex span").text(getSex);
	$(".birthday span").text(getBirthday);
	$(".address span").text(getAddress);
	$(".telephone span").text(getTelephone);
	$(".idcard span").text(getIdCard);
	$(".email span").text(getEmail);
})