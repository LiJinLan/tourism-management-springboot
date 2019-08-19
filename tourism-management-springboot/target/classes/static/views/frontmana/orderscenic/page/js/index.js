var scenic;
var userId;
$(function() {
    var scenicId = getQueryString("id");
    var a = getCookie("user");
    var b = JSON.parse(a);
    //userId = b.data.user.id;
    userId =  b.id;
    $(".inputdate").val(getNowFormatDate());
    $.ajax({
        url: "http://127.0.0.1:8086/scenic/queryScenicById/" + scenicId,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true && data.data != null){
                scenic = data.data.scenic;
                orderDetails(scenic);
            }else{
                alert(data.error);
            }
        },
        error : function(xhr, text, error) {
            alert(data.error);
        }
    });
})

function orderDetails(scenic) {
    $(".product-msg .name").append(`<dt>产品名称：</dt><dd>${scenic.name}</dd>`);
    $(".product-msg .adult").append(`<dt>成人门票：</dt><dd>${scenic.salePrice}元/人</dd>`);
    $(".product-msg .sale").append(`<dt>门票类型：</dt><dd>${scenic.name}景点门票</dd>`);
    $(".product-msg .totalprice").text(`${scenic.salePrice}`)

    var orderDetails = "";
    orderDetails += `<li><a class="pic" href="../../showscenic/page/index.html?id=${scenic.id}"><img src="http://127.0.0.1:8086/file/downloadFile?filePath=${scenic.scenicImage}" alt=""></a></li>
                    <li>
                        <a class="txt" href="../../showscenic/page/index.html?id=${scenic.id}">${scenic.name}</a>
                        <p class="address">${scenic.address}</p>
                    </li>`
    $(".side-order-box .ul-cp").append(orderDetails);
    $(".side-order-box .ul-list").append(`<li>单价：<i class="currency_sy">￥</i>${scenic.salePrice}</li>`); 
    $(".sale-price").val(`${scenic.salePrice}`); 
    $(".show-con .totalprice").text(`${scenic.salePrice}`); 
    $(".order-js-box .total .totalprice").text(`${scenic.salePrice}`);            
}

//订单提交
function myorderSubmit() {
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
                window.location.href = "../../orderhotelsubmit/page/index.html?id="+ data.data.id + "";
            }else{
                alert("提交订单失败！");
            }
        },
        error : function(xhr, text, error) {
            alert("提交订单失败！");
        }
    });
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
                window.location.href = "../../orderadultsubmit/page/index.html?id="+ data.data.id + "";
            }else{
                alert("提交订单失败！");
            }
        },
        error : function(xhr, text, error) {
            alert("提交订单失败！");
        }
    });
}

//获得准备提交的订单数据
function getOrderData() {
    var price = scenic.salePrice;
    var num = $(".table-msg input[name='dingnum']").val();
    var orderObj = {
        userId: userId,
        name: scenic.name,
        productId: scenic.id,
        imagePath: scenic.scenicImage,
        price: price,
        status: "等待付款",
        usedDay: $(".table-msg input[name='usedate']").val(),
        ticketNum: $(".table-msg input[name='dingnum']").val(),
        totalMoney: parseInt(scenic.salePrice) * parseInt(num), 
        personName: $(".product-msg input[name='linkman']").val(),
        telephone: $(".product-msg input[name='linktel']").val(),
        remark: $(".product-msg textarea[name='remark']").val(),
        email: $(".product-msg input[name='linkemail']").val(),
        type: "scenic",
        adult: "true"
    }
    return orderObj;
}