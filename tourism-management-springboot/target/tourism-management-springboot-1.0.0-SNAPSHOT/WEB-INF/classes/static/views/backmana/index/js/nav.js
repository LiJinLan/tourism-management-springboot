$(function(){
        var a = [
        {
            name: "网站配置",
            children: [
                    {
                        name: "网站设置",
                        url: "/a.html"
                    },
                    {
                        name: "友情链接",
                        url: "/b.html"
                    },
                    {
                        name: "分类管理",
                        url: "/c.html"
                    },
                    {
                        name: "系统日志",
                        url: "/d.html"
                    }
                ]
            },
            {
                name: "文章管理",
                children: [
                    {
                        name: "站内新闻",
                        url: "/e.html"
                    },
                    {
                        name: "站内公告",
                        url: "/f.html"
                    },
                    {
                        name: "登录日志",
                        url: "/g.html"
                    }
                ]
            },
            {
                name: "订单管理",
                children: [
                    {
                        name: "订单列表",
                        url: "/h.html"
                    },
                    {
                        name: "打个酱油",
                        url: "/i.html"
                    },
                    {
                        name: "也打酱油",
                        url: "/j.html"
                    }
                ]
            }
        ]

        var tempStr = "";
        for(var i = 0;i <a.length;i++) {
            tempStr += "<li class='nav-item'><a href='javascript:;'><i class='my-icon nav-icon icon_1'></i><span>"+a[i].name + "</span><i class='my-icon nav-more'></i></a><ul>";
            for(var j =0; j< a[i].children.length; j++) {
                tempStr += "<li><a href='sjavascript:;'><span>" + a[i].children[j].name + "</span></a></li>";
            }
            tempStr = tempStr + "</ul></li>";
        }
        $(".nav #mini").append("<img src='images/mini.png'>");
        $(".nav .menu").append(tempStr);
        
 
    //right类列表项添加
        var str ="";
        str += "<span class='userimg'></span>"
        str += "<a class='username' title='用户名' href='#'>33</a>"
        str += "<a class='exit' title='退出系统' href='../../login/login.html'></a>"
        $(".right .menu .menu-left").append("<h1>旅游管理系统</h1>");
        $(".right .menu .menu-right").append(str);

    
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
});