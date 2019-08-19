//退出系统点击事件
function exit() {
    if(confirm("确认退出系统？")) {    //弹出带指定消息且允许用户做选择动作的对话框，点击“确定”返回值为true,点击“取消”返回值为false
        delCookie("user");
        //delCookie("menu");
        delCookie("secondMenuId");
        delCookie("firstMenuId");    
        window.location.href = "../../../login/page/login.html";
    }
}

function centerMember() {
    setCookie("firstMenuId","user-index-page");
    window.location.href = "../../../backstage/member/page/index.html";
}


$(function(){
    var userInfoStr = getCookie("user");
    if(userInfoStr.length == 0) {   //表示没有登录成功
        window.location.href = "../../../login/page/login.html";
    }else {
        var userInfo = JSON.parse(userInfoStr);   //把字符串转换成对象 
             
        //初始化用户信息
        var $txt = '<a class="dl" style="padding:0" href="javascript:;">你好,</a>';
        $txt += '<a class="dl" onclick="centerMember();" href="javascript:void(0);">'+userInfo.name+'</a>';
        $txt += '<a class="dl" href="javascript:void(0);" onclick="exit();">退出</a>';
        $("#loginstatus").html($txt);

            
    }
});

