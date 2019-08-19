var hotel;
var userId;
$(function() {
    var hotelId = getQueryString("id");
    var a = getCookie("user");
    var b = JSON.parse(a);
    //userId = b.data.user.id;

    userId = b.id;
    $(".inputdate").val(getNowFormatDate());
    $.ajax({
        url: "http://127.0.0.1:8086/hotel/queryHotelById/" + hotelId,
        ttype: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true && data.data != null){
                hotel = data.data.hotel;
                orderDetails(hotel);
            }else{
                alert(data.error);
            }
        },
        error : function(xhr, text, error) {
            alert(data.error);
        }
    });
})

function orderDetails(hotel) {
    $(".product-msg .name").append(`<dt>产品名称：</dt><dd>${hotel.name}</dd>`);
    $(".product-msg .adult").append(`<dt>产品售价：</dt><dd>${hotel.salePrice}元/人</dd>`);
    $(".product-msg .sale").append(`<dt>产品类型：</dt><dd>${hotel.homeType}</dd>`);
    $(".product-msg .totalprice").text(`${hotel.salePrice}`)

    var orderDetails = "";
    orderDetails += `<li><a class="pic"><img src="http://127.0.0.1:8086/file/downloadFile?filePath=${hotel.hotelImage}" alt=""></a></li>
                    <li>
                        <a class="txt">${hotel.name}</a>
                        <p class="address">${hotel.address}</p>
                    </li>`
    $(".side-order-box .ul-cp").append(orderDetails);
    var hotelDetStr = "";
    hotelDetStr += `<li>床型：${hotel.bedType}</li>
                    <li>宽带：WiFi</li>
                    <li>餐标：${hotel.mealSign}</li>
                    <li>单价：<i class="currency_sy">￥</i>${hotel.salePrice}</li>`
    $(".side-order-box .ul-list").append(hotelDetStr); 
    $(".sale-price").val(`${hotel.salePrice}`); 
    $(".show-con .totalprice").text(`${hotel.salePrice}`); 
    $(".order-js-box .total .totalprice").text(`${hotel.salePrice}`);            
}


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

//获得准备提交的订单数据
function getOrderData() {
    var price = hotel.salePrice;
    var num = $(".table-msg input[name='dingnum']").val();
    var orderObj = {
        userId: userId,
        name: hotel.name,
        productId: hotel.id,
        imagePath: hotel.hotelImage,
        price: price,
        status: "等待付款",
        usedDay: $(".table-msg input[name='usedate']").val(),
        ticketNum: $(".table-msg input[name='dingnum']").val(),
        totalMoney: parseInt(hotel.salePrice) * parseInt(num), 
        personName: $(".product-msg input[name='linkman']").val(),
        telephone: $(".product-msg input[name='linktel']").val(),
        remark: $(".product-msg textarea[name='remark']").val(),
        email: $(".product-msg input[name='linkemail']").val(),
        type: "hotel",
        adult: "false"
    }
    return orderObj;
}