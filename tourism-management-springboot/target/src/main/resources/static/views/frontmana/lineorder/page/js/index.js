var line;
var userId;
$(function() {
    var lineId = getQueryString("id");
    var a = getCookie("user");
    var b = JSON.parse(a);
    userId = b.id;

    $.ajax({
        url: "http://127.0.0.1:8086/line/queryLineById/" + lineId,
        ttype: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true && data.data != null){
                line = data.data.line;
                orderDetails(line);
            }else{
                alert(data.error);
            }
        },
        error : function(xhr, text, error) {
            alert(data.error);
        }
    });
})

function orderDetails(line) {
    $(".product-msg .name").append(`<dt>产品名称：</dt><dd>${line.name}</dd>`);
    $(".product-msg .adult").append(`<dt>产品售价：</dt><dd>${line.salePrice}元/人</dd>`);
    $(".product-msg .sale").append(`<dt>套餐类型：</dt><dd>${line.mealSign}</dd>`);
    $(".product-msg .totalprice").text(`${line.salePrice}`)

    var orderDetails = "";
    orderDetails += `<li><a class="pic" href="../../showline/page/index.html?id=${line.id}"><img src="http://127.0.0.1:8086/file/downloadFile?filePath=${line.lineImage}" alt=""></a></li>
                    <li>
                        <a class="txt" href="../../showline/page/index.html?id=${line.id}">${line.name}</a>
                    </li>`
    var lineDetStr = "";
    lineDetStr += `<li>往返交通：${line.gobackWay}</li>
                    <li>联系电话：${line.telephone}</li>
                    <li>提前报名：${line.aheadApply}</li>
                    <li>单价：<i class="currency_sy">￥</i>${line.salePrice}</li>
                    <li>数量：<span class="dingnum">1</span></li>`
    $(".side-order-box .ul-cp").append(orderDetails);
    $(".side-order-box .ul-list").append(lineDetStr); 
    $(".sale-price").val(`${line.salePrice}`); 
    $(".show-con .totalprice").text(`${line.salePrice}`); 
    $(".order-js-box .total .totalprice").text(`${line.salePrice}`);            
}


function orderSubmit() {
    var userName = $(".pm-list input[name='linkman']").val();
    var telephone = $(".pm-list input[name='linktel']").val();
    var dayUse = $(".table-msg input[name='usedate']").val()
    if(dayUse.length == 0) {
        alert("使用日期不能为空");
        return false;
    }
    if(userName.length == 0) {
        alert("联系人不能为空");
        return false;
    }
    if(telephone.length == 0) {
        alert("手机号码不能为空")
        return false;
    }

    var reqData = getOrderData();
    $.ajax({
        url: "http://127.0.0.1:8086/order/addOrder",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(reqData),
        success: function successCallBack(data) {
            if(data.success==true){
                window.location.href = "../../orderlinesubmit/page/index.html?id="+ data.data.id + "";
            }else{
            }
        },
        error : function(xhr, text, error) {
            alert("提交订单失败！");
        }
    });
}

//获得准备提交的订单数据
function getOrderData() {
    var price = line.salePrice;
    var num = $(".table-msg input[name='dingnum']").val();
    var orderObj = {
        userId: userId,
        name: line.name,
        productId: line.id,
        imagePath: line.lineImage,
        price: price,
        status: "等待付款",
        usedDay: $(".table-msg input[name='usedate']").val(),
        ticketNum: $(".table-msg input[name='dingnum']").val(),
        totalMoney: parseInt(line.salePrice) * parseInt(num), 
        personName: $(".product-msg input[name='linkman']").val(),
        telephone: $(".product-msg input[name='linktel']").val(),
        remark: $(".product-msg textarea[name='remark']").val(),
        email: $(".product-msg input[name='linkemail']").val(),
        type: "line",
        adult: "false"
    }
    return orderObj;
}