$(function() {
	refresh();
})

function refresh() {
	var user = getCookie("user");
	var a = JSON.parse(user);
	//var b = a.data.user;
	var b = a;
	$.ajax({
		url: "http://127.0.0.1:8086/order/queryOrderAll",
	    type: "GET",
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
		// success: function successCallBack(data) {
		// 	if(data.success==true && data.data != null && data.data[0].userId == b.id){
		// 		allOrder = data.data;
		// 		queryorderall(allOrder);
		// 	}else{
		// 		pnotify("还没有预订任何订单！", "查看订单失败");
		// 	}
		// },
		success: function successCallBack(data) {
			var orderAllList = [];
			if(data.success ==true && data.data !=null) {
				switch( b.roleId) {
					//普通用户
					case "0" :
						for(var i = 0; i < data.data.length; i++){
							if( data.data[i].userId == b.id ){
								orderAllList.push( data.data[i] );

							}
						}
						if(orderAllList.length > 0){
							queryorderall( orderAllList );
						} else {
							pnotify("还没有预订任何订单！","查询订单失败");
						}
						break;
					//旅行社管理员
					case "1" : 
						var allOrder = data.data;
						queryorderall( allOrder );
						break;
					//景点管理管理
					case "1544779186726" :
						for(var i = 0; i < data.data.length; i++){
							if( data.data[i].type == "scenic" ){
								orderAllList.push( data.data[i] );

							}
						}
						if(orderAllList.length > 0){
							queryorderall( orderAllList );
						} else {
							pnotify("还没有预订任何订单！","查询订单失败");
						}
						break;
					//酒店管理员
					case "1554370067938" :
						for(var i = 0; i < data.data.length; i++){
							if( data.data[i].type == "hotel" ){
								orderAllList.push( data.data[i] );

							}
						}
						if(orderAllList.length > 0){
							queryorderall( orderAllList );
						} else {
							pnotify("还没有预订任何订单！","查询订单失败");
						}
						break;
					//线路管理员
					case "1554370557772" :
						for(var i = 0; i < data.data.length; i++){
							if( data.data[i].type == "line" ){
								orderAllList.push( data.data[i] );

							}
						}
						if(orderAllList.length > 0){
							queryorderall( orderAllList );
						} else {
							pnotify("还没有预订任何订单！","查询订单失败");
						}
						break;

					default :
						console.log("不是合理的角色id");

				}
			} else {
				pnotify("还没有预定任何订单！","查看订单失败");
			}

		},
		error : function(xhr, text, error) {
			pnotify("还没有预订任何订单！","查看订单失败");
		}
	});
}

function queryorderall(allOrder) {
	for (var i = 0; i < allOrder.length; i++) {
		var orderStr = "";
		var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + allOrder[i].imagePath;
		orderStr += `<tr class="orderList">
	                    <td height="114">
	                        <div class="con">
	                            <dl>
	                                <dt><a href="${allOrder[i].productId}" target="_blank">
	                                    <img src="${imgsrc}" alt="" />
	                                    </a>
	                                </dt>
	                                <dd>
	                                    <a class="tit" href="" target="_blank">${allOrder[i].name}</a>
	                                    <p>订单编号：${allOrder[i].id}</p>
	                                    <p>下单时间：${allOrder[i].orderTime}</p>
	                                    <p class="scenicType">产品类型： 儿童门票</p>
	                                </dd>
	                            </dl>
	                        </div>
	                    </td>
	                    <td align="center"><span class="price"><i class="currency_sy">￥</i>${allOrder[i].totalMoney}</span></td>
	                    <td align="center"><span class="dfk">${allOrder[i].status}</span></td>
	                    <td align="center">
	                        <a class="now-fk" href="http://127.0.0.1:8086/views/backstage/orderquery/page/index.html?id=${allOrder[i].id}">立即付款</a>
	                        <a orderid="${allOrder[i].id}" class="cancel_order now-dp" style="background:#ccc" href="javascript:;" data-orderid="37" onclick="del(event);">取消</a>
	                        <a class="order-ck" href="http://127.0.0.1:8086/views/backstage/orderquery/page/index.html?id=${allOrder[i].id}">查看订单</a>
	                    </td>
	                </tr>`
	    if(allOrder[i].type == "scenic") {
	    	$(".order-list table").append(orderStr);
	    	if(allOrder[i].adult == 'true') {
	    		$(".order-list table .scenicType").text("产品类型： 成人门票")
	    	}
	    }
	}
}

function del(event) {
	var orderid = $(event.target).attr("orderid");
	var reqData = {
        id: orderid,
        status: "订单已取消"
    };

    $.ajax({
        url: "http://127.0.0.1:8086/order/updateOrder",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(reqData),
        success: function successCallBack(data) {
            if(data.success==true){
            	$(".user-home-order table .orderList").html("");
            	refresh();
            }else{
            	alert("取消订单失败！")
            }
        },
        error : function(xhr, text, error) {
        	alert("取消订单失败！")
        }
    });
}


	


