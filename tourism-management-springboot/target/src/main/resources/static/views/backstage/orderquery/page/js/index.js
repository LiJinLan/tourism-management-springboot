var order;
$(function() {
    var orderId = getQueryString("id");
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


