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
    $(".payment-msg .msg-tit").append(`<span>订单总额：<b>￥${order.totalMoney}</b></span>`);
    var orderDetails = "";
    orderDetails += `<li><em>订单编号：</em><a>${order.id}</a></li>
                    <li><em>产品名称：</em><a target="_blank">${order.name}</a></li>
                    <li><em>门票类型：</em>儿童门票</li>
                    <li><em>使用日期：</em>${order.usedDay}</li>
                    <li><em>购买时间：</em>${order.orderTime}</li>`
    $(".payment-msg .msg-list ul").append(orderDetails);         
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
