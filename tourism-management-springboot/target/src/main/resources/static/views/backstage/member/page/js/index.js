$(function() {
	var user = getCookie("user");
	var b = JSON.parse(user);
    var userId = b.id
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
})

function userStr(user) {
	var orderStr = `<div class="title">旅游管理系统</div>
					<div class="user-msg-con">
						<div class="user-pic">
							<a href="/member/index/userinfo"><img src="../res/images/member_nopic.png" width="90" height="90" />
							</a>
						</div>
						<div class="user-txt">
	                        <p class="name">${user.name}</p>
	                        <p class="mail-box">真实姓名：
	                            ${user.realName}</p>
	                        <p class="phone-num">手机号码：
	                            ${user.telephone}</p>
	                    </div>
	                </div>
	                <p class="hint-txt">
	                    尊敬的${user.name}用户，欢迎您使用旅游管理系统!
	                </p>`
    $(".user-home-box .hint-msg-box").append(orderStr);
}