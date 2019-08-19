
$(function(){
    var userInfoStr = getCookie("user");
    if(userInfoStr.length == 0) {   //表示没有登录成功
        window.location.href = "../../../login/page/login.html";
    }else {
        var userInfo = JSON.parse(userInfoStr);   //把字符串转换成对象 
        var navUl = $(".user-side-menu ul");
        navUl.html("").append(
            '<li class="first-menu" id="user-index-page"><a id="nav_index" class="ico01" href="http://127.0.0.1:8086/views/backstage/member/page/index.html">会员首页</a></li>');

        //初始化菜单
        $.ajax({
            url: "http://127.0.0.1:8086/menu/queryMenusByRole/" +  userInfo.roleId,   //userInfo.roleId代表是传入后端方法的参数
            type: "GET",
            contentType: "applicatin/json",
            success: function successCallBack(resData) {
                if(resData.success==true && resData.data != null){
                    var menus = resData.data;
                    var tempStr = "";
                    for(var i = 0;i <menus.length;i++) {
                        tempStr += "<li class='first-menu nav-item' id='" + menus[i].firstMenuId +"'><a href='javascript:;' name='" + menus[i].firstMenuId +"'><img class='my-icon nav-icon' src='http://127.0.0.1:8086/file/downloadFile?filePath="+ menus[i].firstMenuImg +"' /><span>"+menus[i].name + "</span><i class='my-icon nav-more'></i></a><ul>";
                        for(var j =0; j< menus[i].children.length; j++) {
                            tempStr += '<li id="' + menus[i].children[j].secondMenuId +'"><a href="' + menus[i].children[j].url +  '" name="' + menus[i].children[j].secondMenuId + '"><span>' + menus[i].children[j].name + "</span></a></li>";
                        }
                        tempStr = tempStr + "</ul></li>";
                    }
                    tempStr += "<li class='first-menu nav-item' id='index-page'><a href='../../../frontmana/index/page/index.html'><span>首页</span></a><ul>";
                    navUl.append(tempStr);
                    selectCurrentMenu();
                }
            },
            error: function errorCallBack(xhr) {
                console.log('请求菜单出错');
            }
        });
    }
    
    // nav收缩展开
    $(".user-side-menu>ul").on('click','.nav-item>a',function(){
        if ($(this).next().css('display') == "none") {
            //展开未展开
            $('.nav-item').children('ul').slideUp(300);   //slideUp()和slideDown()方法是收缩和展开的那个效果
            $(this).next('ul').slideDown(300);
            $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
        }else{
            //收缩已展开
            $(this).next('ul').slideUp(300);
            $('.nav-item.nav-show').removeClass('nav-show');
        }
        var firstMenuId = $(this).attr("name");
        setCookie("firstMenuId",firstMenuId);
    });


    $(".user-side-menu>ul").on('click','li.first-menu',function(){
        var firstMenuId = $(this).attr("id");
        setCookie("firstMenuId",firstMenuId);
        var $lis = $(this).find("li"); 
        if($lis.length == 0) {
            delCookie("secondMenuId");
        }
    });

    $(".user-side-menu>ul").on('click',".nav-item ul li a",function(){
        var secondMenuId = $(this).attr("name");
        setCookie("secondMenuId",secondMenuId);
    });

    function selectCurrentMenu() {
        //展开一级菜单
        var firstMenuId = getCookie("firstMenuId");
        if(firstMenuId.length > 0){
            firstMenuId = "#" + firstMenuId;
            $(firstMenuId).addClass("nav-show");
        }
        
        //高亮选中二级菜单
        var secondMenuId = getCookie("secondMenuId");
        if(secondMenuId.length > 0){
            secondMenuId = "#" + secondMenuId;
            $(secondMenuId).addClass("nav-selected");
        }
    }
});

