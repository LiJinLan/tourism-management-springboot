var order; 
var disabledStar = false;
$(function() {
    var orderId = getQueryString("id");
    //$.fn.raty.defaults.path = 'res/images';
    //$('#star').raty({width: 150, starOff: 'star-off.png', target: '#hint', targetType: 'number'});

    var oStar = document.getElementById("star");
    var aLi = oStar.getElementsByTagName("li");
    var oUl = oStar.getElementsByTagName("ul")[0];
    var oSpan = oStar.getElementsByTagName("span")[1];
    var oP = oStar.getElementsByTagName("p")[0];
    var i = iScore = iStar = 0;
    var aMsg = [
                "很不满意|很不满意，与旅行社描述的严重不符，非常不满",
                "不满意|不满意，服务不到位，风景很差，不满意",
                "一般|一般，还可以接受，风景挺不错，服务还可以",
                "满意|满意，与网站上描述的基本一致，还是挺满意的",
                "非常满意|非常满意，风景很好，服务非常到位，非常满意"
                ]
    
    for (i = 1; i <= aLi.length; i++){
        aLi[i - 1].index = i;
        
        //鼠标移过显示分数
        aLi[i - 1].onmouseover = function (){
            if(!disabledStar) {
                fnPoint(this.index);
                //浮动层显示
                oP.style.display = "block";
                //计算浮动层位置
                oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
                //匹配浮动层文字内容
                oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
            }
        };
        
        //鼠标离开后恢复上次评分
        aLi[i - 1].onmouseout = function (){
            if(!disabledStar) {
                fnPoint();
                //关闭浮动层
                oP.style.display = "none";
            }
        };
        
        //点击后进行评分处理
        aLi[i - 1].onclick = function (){
            if(!disabledStar) {
                iStar = this.index;
                oP.style.display = "none";
                oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")"
            }
        }
    }
    
    //评分处理
    function fnPoint(iArg){
        //分数赋值
        iScore = iArg || iStar;
        for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : ""; 
    }
    




    $.ajax({
        url: "http://127.0.0.1:8086/order/queryOrderById/" + orderId,
        ttype: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true && data.data != null){
                order = data.data;
                orderDetails(order);
            }else{
                alert("查询订单失败");
            }
        },
        error : function(xhr, text, error) {
            alert("查询订单失败");
        }
    });
    $("#appraiseText").bind("keydown", function(){  
        var count = $("#appraiseText").val().length;  
        if( count <= 200 ){  
            $("#textCount").html(" 还能输入<font color='green'><b>" + (200 - count) + "</b></font>个字");  
        }else{  
            $("#textCount").html(" 已超出<font color='red'><b>" + (count - 200) + "</b></font>个字");  
        }  
    });   
})

function orderDetails(order) {
    var orderDetails = "";
    orderDetails += `<h3 class="pm-tit">
                        <strong class="ico01">预定信息</strong>
                    </h3>
                    <dl class="pm-list">
                        <dt>订单编号：</dt>
                        <dd>${order.id}</dd>
                    </dl>
                    <dl class="pm-list">
                        <dt>订单状态：</dt>
                        <dd>
                            <span class="zt-nfk">${order.status}</span>
                        </dd>
                    </dl>
                    <dl class="pm-list">
                        <dt>下单时间：</dt>
                        <dd>${order.orderTime}</dd>
                    </dl>`
    $(".user-order-show .title").append(orderDetails);

    //判断产品类型
    if(order.type == "scenic") {
        if(order.adult == 'true') { 
            $(".user-order-show .title").append('<dl class="pm-list"><dt>产品类型：</dt><dd>成人门票</dd></dl>');
        }else{
            $(".user-order-show .title").append('<dl class="pm-list"><dt>产品类型：</dt><dd>儿童门票</dd></dl>');
        }
    }
    else if(order.type == "hotel") {
        $(".user-order-show .title").append('<dl class="pm-list"><dt>产品类型：</dt><dd>酒店住宿房</dd></dl>');
    }
    else if(order.type.type == "line") {
        $(".user-order-show .title").append('<dl class="pm-list"><dt>产品类型：</dt><dd>线路门票</dd></dl>');
    }

    //插入产品信息
    var orderDetStr = "";
    orderDetStr += `<tr>
                        <th width="50%" height="40" scope="col"><span class="l-con">产品名称</span></th>
                        <th width="15%" scope="col">使用日期</th>
                        <th width="10%" scope="col">数量</th>
                        <th width="15%" scope="col">单价</th>
                        <th width="10%" scope="col">总价</th>
                    </tr>
                    <tr>
                    <td height="40"><span class="l-con">${order.name}</span></td>
                        <td>${order.usedDay}</td>
                        <td>${order.ticketNum}</td>
                        <td>${order.price}</td>
                        <td><i class="currency_sy">￥</i>${order.totalMoney}</td>
                    </tr>`
    $(".user-order-show .middle table").append(orderDetStr); 

    
    if(order.pfGrade != null) {
        //$(".block input").attr("disabled","disabled");
        disabledStar = false;
        var starIndex = parseInt(order.pfGrade) -1;
        var $starLi = $($("#star").find("li")[starIndex]);
        $starLi.click();
        $starLi.mouseover();
        $starLi.mouseout();
        disabledStar = true;
        $(".block textarea").attr("disabled","disabled");
        $(".block button").attr("disabled","disabled");
        $(".block button").remove();
        //$(".block input[name='sex'][value='" + sex + "']").prop("checked", "checked");
        //$(".star-rating input:radio[name='pf_grade'][value='" + order.pfGrade + "']").prop("checked", "checked");
        $(".block textarea").val(`${order.pfAppraiseText}`);
    } else {
        disabledStar = false;
    }



    //插入联系人信息
    var userDet = "";
    userDet += `<h3 class="pm-tit">
                    <strong class="ico02">联系人信息</strong>
                </h3>
                <dl class="pm-list">
                    <dt>联   系   人：</dt>
                    <dd>${order.personName}</dd>
                </dl>
                <dl class="pm-list">
                    <dt>手机号码：</dt>
                    <dd>${order.telephone}</dd>
                </dl>
                <dl class="pm-list">
                    <dt>备注留言：</dt>
                    <dd>${order.remark}</dd>
                </dl>`
    $(".user-order-show .bottom").append(userDet); 
    $(".user-order-show .orderpay .totle dd").append('<span class="zj"><i class="currency_sy">￥</i>'+ order.totalMoney +'</span><span class="hq">获得积分：10</span>');
    $(".user-order-show .order-settle input").append(`<span>订单结算总额：<strong><i class="currency_sy">￥</i>${order.totalMoney}</strong></span>`);          
}


function pay() {
    var reqData = {
        id: order.id,
        status: "已付款"
    };

    $.ajax({
        url: "http://127.0.0.1:8086/order/updateOrder",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(reqData),
        success: function successCallBack(data) {
            if(data.success==true){
                alert("付款成功！");
            }else{
                alert("付款失败！");
            }
        },
        error : function(xhr, text, error) {
            alert("付款失败！");
        }
    });
}



function pf_summit() {
    //var pfGrade = $(".star-rating input:radio[name='pf_grade']:checked").val();
    var pfGrade = iScore;
    var pfAppraiseText = $("#appraiseText").val();
    if(pfAppraiseText.length < 5)
    {
        alert("请输入至少5个字的评论");
        return false;
    }
    if(pfAppraiseText.length > 200)
    {
        alert("请输入少于200个字的评论");
        return false;
    }
    var pfData = {
        id: order.id,
        pfGrade: pfGrade,
        pfAppraiseText: pfAppraiseText
    }
    $.ajax({
        url: "http://127.0.0.1:8086/order/appraiseGrade",
        type: "POST",
        contentType: "application/json;charset=urf-8",
        data: JSON.stringify(pfData),
        success: function successCallBack(data) {
            if(data.success == true){
                pnotify("评论成功", "评论成功", "success");
                disabledStar = true;

                $(".block input").attr("disabled","disabled");
                $(".block textarea").attr("disabled","disabled");
                $(".block button").attr("disabled","disabled");
                $(".block button").remove();
            }
            
            
        },
        error: function errorCallBcak(data) {
            alert("评论失败！");
        }
    });
}





