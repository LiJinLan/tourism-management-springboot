$(function() {
	//导航选中
	$(".tabnav span[data-type='all']").removeClass("on");
	$(".tabnav span[data-type='unpay']").addClass('on');
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
		/*success: function successCallBack(data) {
			if(data.success==true && data.data != null && data.data[0].userId == b.id){
				allOrder = data.data;
				queryorderall(allOrder);
			}else{
				pnotify("还没有预订任何订单！","查看订单失败");
			}
		},*/
		success: function successCallBack(data) {
			var orderAllList = [];
			if(data.success ==true && data.data !=null) {
				switch( b.roleId) {
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
					case "1" : 
						var allOrder = data.data;
						queryorderall( allOrder );
						break;
					//case "1544779186726"
					default :
						console.log("不是0和1的角色id");

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
		if(allOrder[i].status == "等待付款") {
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
		    $(".order-list table").append(orderStr);
	        var $trNum = $(".user-home-order table .orderList .tit");
	        if(allOrder[i].type == "scenic") {
	            if(allOrder[i].adult == 'true') {
	            	$($trNum[i]).parent().append("<p>产品类型： 成人门票</p>");
	                $($trNum[i]).attr("href","http://127.0.0.1:8086/views/frontmana/showscenic/page/index.html?id=" + allOrder[i].productId);
	            }else{
	            	$($trNum[i]).parent().append("<p>产品类型： 儿童门票</p>");
	                $($trNum[i]).attr("href","http://127.0.0.1:8086/views/frontmana/showscenic/page/index.html?id=" + allOrder[i].productId);
	            }
	        }
	        else if(allOrder[i].type == "hotel") {
	        	$($trNum[i]).parent().append("<p>产品类型： 酒店住宿房</p>");
	            $($trNum[i]).attr("href","http://127.0.0.1:8086/views/frontmana/hotelshow/page/index.html?id=" + allOrder[i].productId);
	        }
	        else if(allOrder[i].type == "line") {
	        	$($trNum[i]).parent().append("<p>产品类型： 线路门票</p>");
	            $($trNum[i]).attr("href","http://127.0.0.1:8086/views/frontmana/lineshow/page/index.html?id=" + allOrder[i].productId);
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


	


