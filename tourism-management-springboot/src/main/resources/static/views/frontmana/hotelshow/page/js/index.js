var hotel;
$(function() {
    var hotelId = getQueryString("id");

    $.ajax({
        url: "http://127.0.0.1:8086/hotel/queryHotelById/" + hotelId,
        ttype: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true && data.data != null){
                hotel = data.data.hotel;
                hotelTitle(hotel);
                hotelOrder(hotel);
                introduce(hotel);
                referenceRecom();
            }else{
                alert(data.error);
            }
        },
        error : function(xhr, text, error) {
            alert(data.error);
        }
    });
})

function hotelTitle(hotel) {

    var hotelStr = '';
    hotelStr +=`<div class="hs-title">
                    <h1>${hotel.name}</h1>
                    <p>${hotel.address}</p>
                </div>
                <div class="price">
                    <span>电询</span>
                </div>
                <div class="sl">
                    <span>销量：${hotel.tradeVolume}</span><s>|</s><span>满意度：${hotel.satisfaction}</span><s>|</s><span>推荐：</span>
                </div>
                <ul class="msg-ul">
                    <li><em>酒店星级：</em><p>${hotel.grade}</p></li>
                    <li><em>开业时间：</em><p>${hotel.openTime}</p></li>
                    <li><em>装修时间：</em><p>${hotel.decorateTime}</p></li>
                    <li><em>付款方式：</em><p>${hotel.payWay}</p></li>
                    <li><em>酒店电话：</em><p>${hotel.telephone}</p></li>
                </ul>`
    $(".focus-slide .imgnav").append(`<img src="http://127.0.0.1:8086/file/downloadFile?filePath=${hotel.hotelImage}" width="460" height="391"/>`)
    $(".cp-show-msg").append(hotelStr);
}

function hotelOrder(hotel) {
    var orderStr = "";
    orderStr += `<td height="40" class="room" style="cursor: pointer"><strong class="type-tit">${hotel.homeType}</strong></td>
                <td align="center"><span>${hotel.bedType}</span></td>
                <td align="center"><span>${hotel.mealSign}</span></td>
                <td align="center"><span>WiFi</span></td>
                <td align="center"><span><i class="currency_sy">￥</i>${hotel.originalPrice}</span></td>
                <td align="center"><span class="yh"><i class="currency_sy">￥</i>${hotel.salePrice}</span></td>
                <td><a class="booking-btn" href="../../hotelorder/page/index.html?id=${hotel.id}">预订</a></td>`
    $(".roomtype-con .hotel-order").append(orderStr);
}

function introduce(hotel) {
    $(".include .include-det").append("<p>&nbsp;&nbsp;&nbsp;&nbsp;"+hotel.introduce+"</p>");
    $(".include .include-det").append("<h2>更多详细酒店介绍:</h2>");
    for(var i = 0; i < hotel.imageList.length; i++) {
        var introStr = "";
        introStr += `<p>　${hotel.imageList[i].fileDesc}</p>
                    <p>
                        <img src="http://127.0.0.1:8086/file/downloadFile?filePath=${hotel.imageList[i].filePath}" alt="" title="" style="width: 627px; height: 319px;"/>
                    </p>`
        $(".include .include-det").append(introStr);
    }
}



function referenceRecom() {
    var lineId = getQueryString("id");
    var id = lineId;
    /*var date = new Date();
    var presentTime = getNowTime(date);
    var lineId = getQueryString("id");
    var id = lineId;

    presentTime = presentTime.substring(0,19);    
    presentTimeRe = presentTime.replace(/-/g,'/'); 
    var timestamp = new Date(presentTimeRe).getTime();*/
    

    var timeData = {
        id: id,
        //presentTime: presentTime

    };
    $.ajax({
        url: "http://127.0.0.1:8086/line/referenceRecom",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(timeData),
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true && data.data != null){
                allLine = data.data;
                for(var i = 0; i < allLine.length; i++) {
                    var type = data.data[i].type;
                    if(type == "line") {
                        var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + data.data[i].lineImage;
                        var lineStr = "";
                        lineStr = ` <li>
                                        <div class="pic">
                                            <img class="fl" src="${imgsrc}" alt="${data.data[i].name}" width="285" height="190" />
                                            <div class="buy">
                                                <a href="../../lineshow/page/index.html?id=${data.data[i].id}" target="_blank">立即预订</a>
                                            </div>
                                        </div>
                                        <div class="js">
                                            <a class="tit" href="../../lineshow/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
                                            <p class="attr">
                                                <span>销量：${data.data[i].tradeVolume}</span>
                                                <span class="satisfaction">${data.data[i].satisfaction} 分</span>
                                            </p>
                                            <p class="num">
                                                <del>原价：<i class="currency_sy">￥</i>${data.data[i].originalPrice}</del>
                                                <span><b>优惠价￥${data.data[i].salePrice}</b></span>
                                            </p>
                                        </div>
                                    </li>`
                        $(".referenceRecom .st-cp-list").append(lineStr); 
                    } else if(type == "scenic") {
                        var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + data.data[i].scenicImage;
                        var scenicStr = "";
                        scenicStr += `  <li>
                                            <div class="pic">
                                                <img class="fl" src="${imgsrc}" alt="${data.data[i].name}" width="285" height="190" />
                                                <div class="buy">
                                                    <a href="../../showscenic/page/index.html?id=${data.data[i].id}" target="_blank">立即预订</a>
                                                </div>
                                            </div>
                                            <div class="js">
                                                <a class="tit" href="../../showscenic/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
                                                <p class="attr"><span>销量：${data.data[i].tradeVolume}</span><span class="satisfaction">${data.data[i].satisfaction} 分</span></p>
                                                <p class="num">
                                                    <del>原价：<i class="currency_sy">￥</i>${data.data[i].originalPrice}</del>
                                                    <span>
                                                        <b><i class="currency_sy">优惠价￥</i>${data.data[i].salePrice}</b>
                                                    </span>
                                                </p>
                                            </div>
                                        </li>`
                        $(".referenceRecom .st-cp-list").append(scenicStr); 
                    } else {
                        var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + data.data[i].hotelImage;
                        var hotelStr = "";
                        hotelStr += `<li>
                                    <div class="pic">
                                        <img class="fl" src="${imgsrc}" alt="${data.data[i].name}" width="285" height="190" />
                                        <div class="buy">
                                            <a href="../../hotelshow/page/index.html?id=${data.data[i].id}" target="_blank">立即预订</a>
                                        </div>
                                    </div>
                                    <div class="js">
                                        <a class="tit" href="../../hotelshow/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
                                        <span>${data.data[i].homeType}</span>
                                        <span class="attr">销量：${data.data[i].tradeVolume}</span>
                                        <span class="satisfaction">${data.data[i].satisfaction} 分</span>
                                        <p class="num">
                                            <del>原价：<i class="currency_sy">￥</i>${data.data[i].originalPrice}</del>
                                            <span><b>优惠价￥${data.data[i].salePrice}</b></span>
                                        </p>
                                    </div>
                                </li>`
                        $(".referenceRecom .st-cp-list").append(hotelStr);   
                    }
                    
                }
            }else{
                $(".referenceRecom .st-cp-list").append("没有用户预订该产品后还预订别的订单");
            }
        },
        error: function errorCallBack(data) {
            console.log("参考推荐失败");
        }
    });
}