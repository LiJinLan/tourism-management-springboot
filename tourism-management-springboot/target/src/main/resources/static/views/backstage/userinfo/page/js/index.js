var userFlag = true;  
var addressFlag = true; 
var telephoneFlag = true; 
var idcardFlag = true; 
var emailFlag = true;
var userId = "";
$(function() {
	var getUser = getCookie("user");
	var getUserStr = JSON.parse(getUser);
	//var user = getUserStr.data.user;
	//userId = user.id;



	userId = getUserStr.id;
	refresh();

	//真实姓名
	$("input[name = 'realname']").bind("focus",function(e) {
		$(".realname-error").css("display","none");
		$(".realname-ok").css("display","none");
	}).bind("blur",function(){
		if( $(this).val() == '' ) {
			$(".realname-input").css("display","none");
			userFlag = false;
		}else {
			var str = $(this).val().replace(/\s/g,'');
			if( str.length != 0 ) {
				$(".realname-ok").css("display","block");
				$(".realname-input").css("display","none");
				userFlag = true;
			}else {
				$(".realname-input").css("display","none");
				$(".realname-error").css("display","block");
				$(".realname-ok").css("display","none");
				userFlag = false;
			}
		}
	}).bind("keyup",function() {
		var str = $(this).val().replace(/\s/g,'');
		if( str.length != 0 ) {
			$(".realname-input").css("display","none");
			$(".realname-error").css("display","none");
			$(".realname-ok").css("display","block");
		}else {
			$(".realname-input").css("display","block");
			$(".realname-error").css("display","none");
			$(".realname-ok").css("display","none");
		}
	});


	//地址

	$("input[name = 'address']").bind("focus",function(e) {
		$(".address-error").css("display","none");
		$(".address-ok").css("display","none");
	}).bind("blur",function(){
		if( $(this).val() == '' ) {
			$(".address-input").css("display","none");
			addressFlag = false;
		}else {
			var str = $(this).val().replace(/\s/g,'');
			if( str.length != 0 ) {
				$(".address-ok").css("display","block");
				$(".address-input").css("display","none");
				addressFlag = true;
			}else {
				$(".address-input").css("display","none");
				$(".address-error").css("display","block");
				$(".address-ok").css("display","none");
				addressFlag = false;
			}
		}
	}).bind("keyup",function() {
		var str = $(this).val().replace(/\s/g,'');
		if( str.length != 0 ) {
			$(".address-input").css("display","none");
			$(".address-error").css("display","none");
			$(".address-ok").css("display","block");
		}else {
			$(".address-input").css("display","block");
			$(".address-error").css("display","none");
			$(".address-ok").css("display","none");
		}
	});


	//电话号码

	$("input[name = 'telephone']").bind("focus",function(e) {
		$(".telephone-error").css("display","none");
		$(".telephone-ok").css("display","none");
	}).bind("blur",function(){
		if( $(this).val() == '' ) {
			$(".telephone-input").css("display","none");
			telephoneFlag = false; 
		}else {
			var str = $(this).val().replace(/\s/g,'');
			if( str.length == 11 ) {
				$(".telephone-ok").css("display","block");
				$(".telephone-input").css("display","none");
				telephoneFlag = true; 
			}else {
				$(".telephone-input").css("display","none");
				$(".telephone-error").css("display","block");
				$(".telephone-ok").css("display","none");
				telephoneFlag = false; 
			}
		}
	}).bind("keyup",function() {
		var str = $(this).val().replace(/\s/g,'');
		if( str.length == 11 ) {
			$(".telephone-input").css("display","none");
			$(".telephone-error").css("display","none");
			$(".telephone-ok").css("display","block");
		}else {
			$(".telephone-input").css("display","block");
			$(".telephone-error").css("display","none");
			$(".telephone-ok").css("display","none");
		}
	});


	//身份证号

	$("input[name = 'idcard']").bind("focus",function(e) {
		$(".idcard-error").css("display","none");
		$(".idcard-ok").css("display","none");
	}).bind("blur",function(){
		if( $(this).val() == '' ) {
			$(".idcard-input").css("display","none");
			idcardFlag = false;
		}else {
			var str = $(this).val().replace(/\s/g,'');
			if( str.length < 19 && str.length > 15) {
				$(".idcard-ok").css("display","block");
				$(".idcard-input").css("display","none");
				idcardFlag = true;
			}else {
				$(".idcard-input").css("display","none");
				$(".idcard-error").css("display","block");
				$(".idcard-ok").css("display","none");
				idcardFlag = false;
			}
		}
	}).bind("keyup",function() {
		var str = $(this).val().replace(/\s/g,'');
		if( str.length < 19 && str.length > 15) {
			$(".idcard-input").css("display","none");
			$(".idcard-error").css("display","none");
			$(".idcard-ok").css("display","block");
		}else {
			$(".idcard-input").css("display","block");
			$(".idcard-error").css("display","none");
			$(".idcard-ok").css("display","none");
		}
	});




	//电子邮箱
	$("input[name = 'email']").bind("focus",function() {
		$(".email-error").css("display","none");
		$(".email-ok").css("display","none");
		$(".auto-complete").css("display","none");
	}).bind("blur",function() {
		window.liClick = false;
		if( $(this).val() == '' ) {
			$(".email-input").css("display","none");
			emailFlag = false;
		}else {
			if( /^\w+@[a-zA-Z0-9]+(\.[a-z]{2,3}){1,2}$/.test($(this).val()) ) {   //  \w 表示单词字符：[a-zA-Z_0-9];
				$('.email-input').css('display','none');
				$('.email-error').css('display','none');
				$('.email-ok').css('display','block');
				emailFlag = true;
			}else {
				$(".auto-complete li").bind("click",function() {
					$("input[name = 'email']").val($(this).text());
					if( /^\w+@[0-9a-zA-Z_]+(\.[a-zA-Z]{2,3}){1,2}$/.test($("input[name = 'email']").val()) ) {
						$(".email-input").css("display","none");
						$(".email-error").css("display","none");
						$(".email-ok").css("display","block");
						$(".auto-complete").css("display","none");
						emailFlag = true;
					}else {
						$(".email-input").css("display","none");
						$(".email-error").css("display","block");
						$(".email-ok").css("display","none");
						$(".auto-complete").css("display","none");
						emailFlag = false;
					}
					window.liClick = true;
				});
				setTimeout(function() {
					if(  !window.liClick ) {
						$(".email-input").css("display","none");
						$(".email-error").css("display","block");
						$(".email-ok").css("display","none");
						$(".auto-complete").css("display","none");
						emailFlag = false;
					}else {

					}
				},200);
			}
		}
	}).bind("keyup",function() {
		if( $(this).val() == '' ) {
			$(".email-input").css("display","block");
			$(".email-error").css("display","none");
			$(".email-ok").css("display","none");
			$(".auto-complete").css("display","none");
		}else {
			$(".auto-complete span").text($(this).val());
			if( /@/.test($(this).val()) ) {
				$(".auto-complete").css("display","none");
			}else {
				$(".auto-complete").css("display","block");
			}
		}
	});

//生日
	$("input[name = 'birthday']").bind("focus",function() {
		$(".birthday-error").css("display","none");
		$(".birthday-ok").css("display","none");
		$(".auto-complete").css("display","none");
	}).bind("blur",function() {
		if( $(this).val() == '' ) {
			$(".birthday-input").css("display","none");
		}else {
			if( /^([0-9]{4})-(0([0-9]{1})||(1[0-2]{1}))-(([0-2]{1})[0-9]{1}||(3[0-1]{1}))$/.test($(this).val()) ) {   //  \w 表示单词字符：[a-zA-Z_0-9];
				$('.birthday-input').css('display','none');
				$('.birthday-error').css('display','none');
				$('.birthday-ok').css('display','block');
			}else {
				$('.birthday-input').css('display','none');
				$('.birthday-error').css('display','block');
				$('.birthday-ok').css('display','none');
			}
		}
	}).bind("keyup",function() {
		if( $(this).val() == '' ) {	
		}else {
			$(".birthday-input").css("display","block");
			$(".birthday-error").css("display","none");
			$(".birthday-ok").css("display","none");
		}
	});
})


function userinfoModify() {
	var getUser = getCookie("user");
	var getUserStr = JSON.parse(getUser);
	//var user = getUserStr.data.user;



	var user = getUserStr;
	
	var sex = $(".personal-data input[name='sex']").val();
	var birthday = $(".personal-data input[name='birthday']").val();
	var realname = $(".personal-data input[name='realname']").val();
	var address = $(".personal-data input[name='address']").val();
	var telephone = $(".personal-data input[name='telephone']").val();
	var idcard = $(".personal-data input[name='idcard']").val();
	var email = $(".personal-data input[name='email']").val();

	if(telephone.length == 0) {
		$(".telephone-error").text("电话号码不能为空！").css("display","block");
		return false;
	};

	if(email.length == 0) {
		$(".email-error").text("电子邮箱不能为空！").css("display","block");
		return false;
	};

	if(realname.length == 0) {
		$(".realname-error").text("真实姓名不能为空！").css("display","block");
		return false;
	};

	if(idcard.length == 0) {
		$(".idcard-error").text("身份证号不能为空！").css("display","block");
		return false;
	};

	if(address.length == 0) {
		$(".address-error").text("地址不能为空！").css("display","block");
		return false;
	};

	if(userFlag && addressFlag && telephoneFlag && idcardFlag && emailFlag) {
		var userData = {
			"name": user.name,
			"sex": sex,
			"birthday": birthday,
			"email": email,
			"realName": realname,
			"telephone": telephone,
			"address": address,
			"idCard": idcard
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
		    		refresh();
		    	}else{
		    		pnotify("失败", "修改用户信息失败", "error");
		    	}
		    },
		    error: function errorCallBack(xhr) {
		    	pnotify("失败", "找不到相应的用户信息", "error");
		    }
		});
	}
}

function refresh() {
	$.ajax({
	    url: "http://127.0.0.1:8086/user/queryUserById/" + userId,
	    type: "GET",
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
	    success: function successCallBack(data) {
	        if(data.success==true && data.data != null){
	            user = data.data;
	            userStr(user);
	        }else{
	            alert(data.error);
	        }
	    },
	    error : function(xhr, text, error) {
	        alert(data.error);
	    }
	});
}

function userStr(user) {
	$(".personal-data span[name='name']").text(user.name);
	$(".personal-data input[name='sex']").val(user.sex);
	$(".personal-data input[name='birthday']").val(user.birthday);
	$(".personal-data input[name='realname']").val(user.realName);
	$(".personal-data input[name='address']").val(user.address);
	$(".personal-data input[name='telephone']").val(user.telephone);
	$(".personal-data input[name='idcard']").val(user.idCard);
	$(".personal-data input[name='email']").val(user.email);
	$(".telephone-ok").css("display","none");
	$(".birthday-ok").css("display","none");
	$(".address-ok").css("display","none");
	$(".realname-ok").css("display","none");
	$(".email-ok").css("display","none");
	$(".idcard-ok").css("display","none");
}


	