$(function() {
	//导航选中
	$('#nav_allorder').addClass('on');//
	//订单类型切换
	$(".tabnav span").click(function(){
	    var orderType = $(this).attr('data-type');
	    if(orderType == "all") {
	        window.location.href = "../../orderall/page/index.html";	
	    }
	    else if(orderType == "unpay") {
	    	window.location.href = "../../orderallunpay/page/index.html";
	    } 

	})
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
		success: function successCallBack( data ) {
			if(data.success == true && data.data != null){
				switch(b.roleId) {
					//普通用户
					case "0" :
						var orderLineList = [];
						for(var i = 0; i < data.data.length; i++) {
							if( data.data[i].userId == b.id) {
								orderLineList.push( data.data[i] );
							}
						}
						if( orderLineList.length > 0) {
							queryorderall( orderLineList );
						} else {
							pnotify("还没有预定线路订单","查询线路订单失败");
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
						pnotify("不确定的角色id","查询线路订单失败");
				}
			}
		},
		error : function(xhr, text, error) {
			pnotify("还没有预订任何订单！", "查看订单失败");
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
	                                <dt><a href="http://127.0.0.1:8086/views/frontmana/lineshow/page/index.html?id=${allOrder[i].productId}" target="_blank">
	                                    <img src="${imgsrc}" alt="" />
	                                    </a>
	                                </dt>
	                                <dd>
	                                    <a class="tit" href="http://127.0.0.1:8086/views/frontmana/lineshow/page/index.html?id=${allOrder[i].productId}" target="_blank">${allOrder[i].name}</a>
	                                    <p>订单编号：${allOrder[i].id}</p>
	                                    <p>下单时间：${allOrder[i].orderTime}</p>
	                                    <p>产品类型： 线路门票</p>
	                                </dd>
	                            </dl>
	                        </div>
	                    </td>
	                    <td align="center"><span class="price"><i class="currency_sy">￥</i>${allOrder[i].totalMoney}</span></td>
	                    <td align="center">
	                    	<span class="dfk">${allOrder[i].status}</span>
	                    	
	                    	<ul class="pf_grade">
	                    		<li></li>
	                    	</ul>
	                    </td>
	                    <td align="center">
	                        <a class="now-fk" href="http://127.0.0.1:8086/views/backstage/orderquery/page/index.html?id=${allOrder[i].id}">立即付款</a>
	                        <a orderid="${allOrder[i].id}" class="cancel_order now-dp" style="background:#ccc" href="javascript:;" data-orderid="37" onclick="del(event);">取消</a>
	                        <a class="order-ck" href="http://127.0.0.1:8086/views/backstage/orderquery/page/index.html?id=${allOrder[i].id}">查看订单</a>
	                        
	                    </td>
	                </tr>`
	    if(allOrder[i].type == "line") {
	    	$(".order-list table").append(orderStr);
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


	


