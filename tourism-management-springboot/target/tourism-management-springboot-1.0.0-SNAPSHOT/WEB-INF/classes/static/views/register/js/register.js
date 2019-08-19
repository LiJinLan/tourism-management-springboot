$(function() {


	//用户名

	$("input[name = 'username']").bind("focus",function(e) {
		$(".user-input").css("display","block");
		$(".user-error").css("display","none");
		$(".user-ok").css("display","none");
	}).bind("blur",function(){
		if( $(this).val() == '' ) {
			$(".user-input").css("display","none");
		}else {
			var str = $(this).val().replace(/\s/g,'');
			if( str.length < 13 ) {
				$(".user-ok").css("display","block");
				$(".user-input").css("display","none");
			}else {
				$(".user-input").css("display","none");
				$(".user-error").css("display","block");
				$(".user-ok").css("display","none");
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
		}else if ( ! (new RegExp(/^[0-9a-zA-Z_]{6,18}$/)).test( $(this).val() ) ) {
			$(".pass-input").css("display","none");
			$(".pass-error").css("display","block");
			$(".pass-ok").css("display","none");
		}else {
			$(".pass-input").css("display","none");
			$(".pass-error").css("display","none");
			$(".pass-ok").css("display","block");
			$(".safe").css("display","none");
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
		}else if( $(this).val() == $("input[name = 'password']").val() ) {
			$(".confirm-pass-input").css("display","none");
			$(".confirm-pass-error").css("display","none");
			$(".confirm-pass-ok").css("display","block");
		}else {
			$(".confirm-pass-input").css("display","none");
			$(".confirm-pass-error").css("display","block");
			$(".confirm-pass-ok").css("display","none");
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



	//电子邮箱
	$("input[name = 'email']").bind("focus",function() {
		$(".email-input").css("display","block");
		$(".email-error").css("display","none");
		$(".email-ok").css("display","none");
		$(".auto-complete").css("display","none");
	}).bind("blur",function() {
		window.liClick = false;
		if( $(this).val() == '' ) {
			$(".email-input").css("display","none");
		}else {
			if( /^\w+@[a-zA-Z0-9]+(\.[a-z]{2,3}){1,2}$/.test($(this).val()) ) {   //  \w 表示单词字符：[a-zA-Z_0-9];
				$('.email-input').css('display','none');
				$('.email-error').css('display','none');
				$('.email-ok').css('display','block');
			}else {
				$(".auto-complete li").bind("click",function() {
					$("input[name = 'email']").val($(this).text());
					if( /^\w+@[0-9a-zA-Z_]+(\.[a-zA-Z]{2,3}){1,2}$/.test($("input[name = 'email']").val()) ) {
						$(".email-input").css("display","none");
						$(".email-error").css("display","none");
						$(".email-ok").css("display","block");
						$(".auto-complete").css("display","none");
					}else {
						$(".email-input").css("display","none");
						$(".email-error").css("display","block");
						$(".email-ok").css("display","none");
						$(".auto-complete").css("display","none");
					}
					window.liClick = true;
				});
				setTimeout(function() {
					if(  !window.liClick ) {
						$(".email-input").css("display","none");
						$(".email-error").css("display","block");
						$(".email-ok").css("display","none");
						$(".auto-complete").css("display","none");
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




})


function register() {
	var username = $("input[name = 'username']").val();
	var password = $("input[name = 'password']").val();
	var repassword = $("input[name = 'confirm-pass']").val();
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
	if(email.length == 0) {
		$(".email-error").text("电子邮箱不能为空！").css("display","block");
		return false;
	};
	var reqData = {
		"id": getId(),
		"name": username,
		"password": password,
		"email": "email"
	};
	$.ajax({
	    url: "http://localhost:8080/tour/strust2User!register.action",
	    type: "POST",
	    data: reqData,
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true){
	    		pnotify("成功", "注册成功", "success");
	    	}
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "注册失败", "error");
	    }
	});
}




	