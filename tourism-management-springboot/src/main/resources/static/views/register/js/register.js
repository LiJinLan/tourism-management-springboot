var userFlag = true;  
var passwordFlag = true; 
var confirmPasswordFlag = true; 
var telephoneFlag = true; 
var idcardFlag = true; 
var emailFlag = true;

$(function() {
	//用户名
	
	$("input[name = 'username']").bind("focus",function(e) {
		$(".user-input").css("display","block");
		$(".user-error").css("display","none");
		$(".user-ok").css("display","none");
	}).bind("blur",function(){
		if( $(this).val() == '' ) {
			userFlag = false;  
			$(".user-input").css("display","none");
		}else {
			var str = $(this).val().replace(/\s/g,'');
			if( str.length < 13 ) {
				$(".user-ok").css("display","block");
				$(".user-input").css("display","none");
				userFlag = true;
			}else {
				$(".user-input").css("display","none");
				$(".user-error").css("display","block");
				$(".user-ok").css("display","none");
				userFlag = false;
			}
		}
	}).bind("keyup",function() {
		var str = $(this).val().replace(/\s/g,'');
		if( str.length == 6 ) {
			$(".user-input").css("display","none");
			$(".user-error").css("display","none");
			$(".user-ok").css("display","block");
		}else {
			$(".user-input").css("display","block");
			$(".user-error").css("display","none");
			$(".user-ok").css("display","none");
		}
	});



	//验证密码
	$("input[name = 'password']").bind("focus",function(){
		$(".pass-input").css("display","block");
		$(".pass-error").css("display","none");
		$(".pass-ok").css("display","none");
	}).bind("blur",function() {
		if( $(this).val() == '' ) {
			$(".pass-input").css("display","none");
			passwordFlag = false; 
		}else if ( ! (new RegExp(/^[0-9a-zA-Z_]{6,18}$/)).test( $(this).val() ) ) {
			$(".pass-input").css("display","none");
			$(".pass-error").css("display","block");
			$(".pass-ok").css("display","none");
			passwordFlag = false; 
		}else {
			$(".pass-input").css("display","none");
			$(".pass-error").css("display","none");
			$(".pass-ok").css("display","block");
			$(".safe").css("display","none");
			passwordFlag = true; 
		}
	}).bind("keyup",function() {
		if( ( new RegExp(/^[0-9a-zA-Z_]{6,18}$/) ).test( $(this).val() ) ) {
			$(".pass-input").css("display","none");
			$(".safe").css("display","block");
			switch( setSafe($(this).val()) ) {
				case 1:
				$(".s1").css("background","red");
				$(".s2").css("background","#80808045");
				$(".s3").css("background","#80808045");
				$(".word").text("低").css("color","red");
				break;
				case 2:
				$(".s1").css("background","blue");
				$(".s2").css("background","blue");
				$(".s3").css("background","#80808045");
				$(".word").text("中").css("color","blue");
				break;
				case 3:
				$(".s1").css("background","#09ca11");
				$(".s2").css("background","#09ca11");
				$(".s3").css("background","#09ca11");
				$(".word").text("高").css("color","#09ca11");
				break;
			}
		}else {
			$(".pass-input").css("display","block");
			$(".safe").css("display","none")
		}
	});

    //显示密码安全等级
	function setSafe(gg) {
		var len = gg.length;
		var count = 0;
		if( /\d/.test(gg) ) {
			count++;
		}
		if( /[a-zA-z]/g.test(gg) ) {
			count++;
		}
		if(  /_/g.test(gg) ) {
			count++;
		}
		if( len < 10 && count == 1 ) {
			return 1;
		}else if( len < 10 && count == 2) {
			return 2;
		}else {
			return 3;
		}
	}



	//确认密码
	$("input[name = 'confirm-pass']").bind("focus",function() {
		$(".confirm-pass-input").css("display","block");
		$(".confirm-pass-error").css("display","none");
		$(".confirm-pass-ok").css("display","none");
	}).bind("blur",function() {
		if( $(this).val() == '' ) {
			$(".confirm-pass-input").css("display","none");
			confirmPasswordFlag = false; 
		}else if( $(this).val() == $("input[name = 'password']").val() ) {
			$(".confirm-pass-input").css("display","none");
			$(".confirm-pass-error").css("display","none");
			$(".confirm-pass-ok").css("display","block");
			confirmPasswordFlag = true; 
		}else {
			$(".confirm-pass-input").css("display","none");
			$(".confirm-pass-error").css("display","block");
			$(".confirm-pass-ok").css("display","none");
			confirmPasswordFlag = false; 
		}
	}).bind("keyup",function() {
		if( $(this).val() == $("input[name = 'password']").val() ) {
			$(".confirm-pass-input").css("display","none");
			$(".confirm-pass-error").css("display","none");
			$(".confirm-pass-ok").css("display","block");
		}else {
			$(".confirm-pass-input").css("display","block");
			$(".confirm-pass-error").css("display","none");
			$(".confirm-pass-ok").css("display","none");
		}
	});



	//真实姓名

	$("input[name = 'realname']").bind("focus",function(e) {
		$(".realname-input").css("display","block");
		$(".realname-error").css("display","none");
		$(".realname-ok").css("display","none");
	}).bind("blur",function(){
		if( $(this).val() == '' ) {
			$(".realname-input").css("display","none");
		}else {
			var str = $(this).val().replace(/\s/g,'');
			if( str.length != 0 ) {
				$(".realname-ok").css("display","block");
				$(".realname-input").css("display","none");
			}else {
				$(".realname-input").css("display","none");
				$(".realname-error").css("display","block");
				$(".realname-ok").css("display","none");
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
		$(".address-input").css("display","block");
		$(".address-error").css("display","none");
		$(".address-ok").css("display","none");
	}).bind("blur",function(){
		if( $(this).val() == '' ) {
			$(".address-input").css("display","none");
		}else {
			var str = $(this).val().replace(/\s/g,'');
			if( str.length != 0 ) {
				$(".address-ok").css("display","block");
				$(".address-input").css("display","none");
			}else {
				$(".address-input").css("display","none");
				$(".address-error").css("display","block");
				$(".address-ok").css("display","none");
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
		$(".telephone-input").css("display","block");
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
		$(".idcard-input").css("display","block");
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
	$("input[name = 'email']").bind("focus",function(g) {
		$(".email-input").css("display","block");
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
				setTimeout(function() { //延时，因为bind（）给一点点小缓冲，不用太突兀
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
			$(".auto-complete span").text($(this).val());//获取auto-complete span元素，设置它的文本内容为获取当前对象的value值（有四个span）
			if( /@/.test($(this).val()) ) {  //当输入框中的值有“@”这个字符时，就把ul标签隐藏
				$(".auto-complete").css("display","none");
			}else {	//当输入框中的值没有“@”这个字符时，就把ul标签显示
				$(".auto-complete").css("display","block");
			}
		}
	});




})


function register() {
	var username = $("input[name = 'username']").val();
	var password = $("input[name = 'password']").val();
	var repassword = $("input[name = 'confirm-pass']").val();
	var realname = $("input[name = 'realname']").val();
	var address = $("input[name = 'address']").val();
	var telephone = $("input[name = 'telephone']").val();
	var idcard = $("input[name = 'idcard']").val();
	var email = $("input[name = 'email']").val();
	if(username.length == 0) {
		$(".user-error").text("用户名不能为空！").css("display","block");
		return false;
	};
	if(password.length == 0) {
		$(".pass-error").text("密码不能为空！").css("display","block");
		return false;
	};
	if(repassword.length == 0) {
		$(".confirm-pass-error").text("确认密码不能为空！").css("display","block");
		return false;
	}else {
		if(password == repassword) {
			$(".confirm-pass-input").css("display","none");
			$(".confirm-pass-error").css("display","none");
			$(".confirm-pass-ok").css("display","block");
		}else {
			$(".confirm-pass-error").text("两次密码不一致！").css("display","block");
			return false;
		}
	};

	if(realname.length == 0) {
		$(".realname-error").text("真实姓名不能为空！").css("display","block");
		return false;
	};

	if(address.length == 0) {
		$(".address-error").text("地址不能为空！").css("display","block");
		return false;
	};

	if(telephone.length == 0) {
		$(".telephone-error").text("电话号码不能为空！").css("display","block");
		return false;
	};

	if(idcard.length == 0) {
		$(".idcard-error").text("身份证号不能为空！").css("display","block");
		return false;
	};

	if(email.length == 0) {
		$(".email-error").text("电子邮箱不能为空！").css("display","block");
		return false;
	};

	if(userFlag && passwordFlag && confirmPasswordFlag && telephoneFlag && idcardFlag && emailFlag) {
		var reqData = {
			"id": getId(),
			"name": username,
			"password": password,
			"email": email,
			"realName": realname,
			"telephone": telephone,
			"address": address,
			"idCard": idcard
		};
		$.ajax({
		    url: "http://127.0.0.1:8086/user/addUser",
		    type: "POST",
		    contentType: "application/json;charset=utf-8",
		    data: JSON.stringify(reqData),
		    dataType: "json",
		    success: function successCallBack(data) {
		    	if(data.success==true){
		    		pnotify("成功", "注册成功", "success");
		    		$("input[name = 'username']").val('');
		    		$("input[name = 'password']").val('');
		    		$("input[name = 'confirm-pass']").val('');
		    		$("input[name = 'realname']").val('');
		    		$("input[name = 'address']").val('');
		    		$("input[name = 'telephone']").val('');
		    		$("input[name = 'idcard']").val('');
		    		$("input[name = 'email']").val('');

		    		$(".realname-ok").css("display","none");
		    		$(".user-ok").css("display","none");
		    		$(".pass-ok").css("display","none");
		    		$(".confirm-pass-ok").css("display","none");
		    		$(".address-ok").css("display","none");
		    		$(".telephone-ok").css("display","none");
		    		$(".idcard-ok").css("display","none");
		    		$(".email-ok").css("display","none");

		    	}
		    },
		    error: function errorCallBack(xhr) {
		    	pnotify("失败", "注册失败", "error");
		    }
		});
	}
}




	