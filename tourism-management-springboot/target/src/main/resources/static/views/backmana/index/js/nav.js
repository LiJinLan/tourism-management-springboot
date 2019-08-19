$(function(){
    var userInfoStr = getCookie("user");
    if(userInfoStr.length == 0) {   //表示没有登录成功
        window.location.href = "../../login/login.html";
    }else {
        var userInfo = JSON.parse(userInfoStr);   //转换成对象 
        if(userInfo.success == true) {

            //初始化用户信息
            var str ="";
            str += "<span class='userimg'></span>"
            str += "<a class='username' title='用户名' href='#'>" + userInfo.data.user.name + "</a>"
            str += "<a class='exit' title='退出系统' href='../../login/login.html'></a>"
            $(".right .menu .menu-left").append("<h1>旅游管理系统</h1>");
            $(".right .menu .menu-right").append(str);

            //退出系统点击事件
            $(".right .exit").on("click",function() {
                if(confirm("确认退出系统？")) {
                    delCookie("user");
                    delCookie("secondMenuId");
                    delCookie("firstMenuId");    
                    window.location.href = "../../login/login.html";
                }
            }); 

            //初始化菜单
            var menu = userInfo.data.menu;
            var a = menu;
            var tempStr = "";
            for(var i = 0;i <a.length;i++) {
                tempStr += "<li class='nav-item' id='" + a[i].firstMenuId +"'><a href='javascript:;' name='" + a[i].firstMenuId +"'><i class='my-icon nav-icon icon_1'></i><span>"+a[i].name + "</span><i class='my-icon nav-more'></i></a><ul>";
                for(var j =0; j< a[i].children.length; j++) {
                    tempStr += '<li id="' + a[i].children[j].secondMenuId +'"><a href="' + a[i].children[j].url +  '" name="' + a[i].children[j].secondMenuId + '"><span>' + a[i].children[j].name + "</span></a></li>";
                }
                tempStr = tempStr + "</ul></li>";
            }
            tempStr += "<li class='nav-item'><a href='../../frontmana/scenic/page/scenic.html'><span>首页</span></a><ul>";
            $(".nav #mini").append("<img src='images/mini.png'>");
            $(".nav .menu").append(tempStr);
        }
    }
    
    // nav收缩展开
    $('.nav-item>a').on('click',function(){
        if (!$('.nav').hasClass('nav-mini')) {
            if ($(this).next().css('display') == "none") {
                //展开未展开
                $('.nav-item').children('ul').slideUp(300);
                $(this).next('ul').slideDown(300);
                $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show');
            }else{
                //收缩已展开
                $(this).next('ul').slideUp(300);
                $('.nav-item.nav-show').removeClass('nav-show');
            }
            var firstMenuId = $(this).attr("name");
            setCookie("firstMenuId",firstMenuId);
        }
    });
    //nav-mini切换
    $('#mini').on('click',function(){
        if (!$('.nav').hasClass('nav-mini')) {
            $('.nav-item.nav-show').removeClass('nav-show');
            $('.nav-item').children('ul').removeAttr('style');
            $('.nav').addClass('nav-mini');
            $(".right").css("width","calc(100vw - " + 80 + "px");
        }else{
            $('.nav').removeClass('nav-mini');
            $(".right").css("width","calc(100vw - " + 220 + "px");
        }
    });

    $('.nav-item ul li').on('click',"a",function(){
        var secondMenuId = $(this).attr("name");
        setCookie("secondMenuId",secondMenuId);
    });

    selectCurrentMenu();

    function selectCurrentMenu() {
        //展开一级菜单
        var firstMenuId = getCookie("firstMenuId");
        if(firstMenuId.length > 0){
            firstMenuId = "#" + firstMenuId;
            $(firstMenuId).addClass("nav-show");
        }
        
        //高亮二级菜单
        var secondMenuId = getCookie("secondMenuId");
        if(secondMenuId.length > 0){
            secondMenuId = "#" + secondMenuId;
           $(secondMenuId).addClass("nav-selected");
        }
    }
});

