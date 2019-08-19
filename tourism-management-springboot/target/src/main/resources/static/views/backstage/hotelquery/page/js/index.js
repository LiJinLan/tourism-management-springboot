var allHotel;
$(function() {
	$.ajax({
		url: "http://127.0.0.1:8086/hotel/queryHotelAll",
	    type: "GET",
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				allHotel = data.data;
				for(var i = 0; i < allHotel.length; i++) {
					var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + data.data[i].hotelImage;
					var hotelStr = "";
					hotelStr += `<tr>
			                        <td height="175px">
			                            <div width="200px" height="175px" float="left">
			                                <dl>
			                                	<dd>
			                                	    <a class="title" href="../../../frontmana/hotelshow/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
			                                	    <p>${data.data[i].province}省  ${data.data[i].city}市</p>
			                                	    <p>地址:${data.data[i].address}</p>
			                                	    <p>Tel:${data.data[i].telephone}</p>
			                                	</dd>
			                                    <dt>
			                                        <a href="../../../frontmana/showscenic/page/index.html?id=${data.data[i].id}" target="_blank">
			                                            <img src="${imgsrc}" alt="" width="105px" height="80px">
			                                        </a>
			                                    </dt>
			                                </dl>
			                            </div>
			                        </td>
			                        <td align="center"><span class="price"><i class="currency_sy">￥</i>${data.data[i].originalPrice}</span></td>
			                        <td align="center"><span class="price"><i class="currency_sy">￥</i>${data.data[i].salePrice}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].tradeVolume}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].satisfaction}%</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].homeType}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].bedType}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].grade}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].openTime}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].payWay}</span></td>
			                        <td align="center"  class="operation">
			                        	<a href="../../hotelsearch/page/index.html?id=${data.data[i].id}" target="_blank">查看</a>
			                        	<a href="../../hotelmodify/page/index.html?id=${data.data[i].id}" target="_blank">修改</a>
			                        	<a hotelid="${data.data[i].id}" onclick="del(event);" href="javaScript:;" target="_blank">删除</a>
			                        </td>
			                    </tr>`	
					$(".user-home-order table").append(hotelStr);	
				}
			}else{
				alert(data.error);
			}
		},
		error : function(xhr, text, error) {
			alert(data.error);
		}
	});
});

function del(event) {
	var hotelId = $(event.target).attr("hotelid");
    $.ajax({
        url: "http://127.0.0.1:8086/hotel/deleteHotelById/" + hotelId,
        type: "DELETE",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true){
				$(event.target).parent().parent().html("");
            }else{
                alert("删除酒店失败");
            }
        },
        error : function(xhr, text, error) {
            alert("删除酒店失败");
        }
    });
}
