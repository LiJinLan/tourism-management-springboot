var allScenic;
$(function() {
	$.ajax({
		url: "http://127.0.0.1:8086/scenic/queryScenicAll",
	    type: "GET",
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				allScenic = data.data;
				for(var i = 0; i < allScenic.length; i++) {
					var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + data.data[i].scenicImage;
					var scenicStr = "";
					scenicStr += `<tr>
			                        <td height="175px">
			                            <div width="200px" height="175px" float="left">
			                                <dl>
			                                	<dd>
			                                	    <a class="title" href="../../../frontmana/showscenic/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
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
			                        <td align="center"><span class="price"><i class="currency_sy">￥</i>${data.data[i].childPrice}</span></td>
			                        <td align="center"><span class="price"><i class="currency_sy">￥</i>${data.data[i].childSale}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].tradeVolume}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].satisfaction}%</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].grade}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].payWay}</span></td>
			                        <td align="center" class="operation">
			                        	<a href="../../scenicsearch/page/index.html?id=${data.data[i].id}" target="_blank">查&nbsp;看</a>
			                        	<a href="../../scenicmodify/page/index.html?id=${data.data[i].id}" target="_blank">修&nbsp;改</a>
			                        	<a scenicid="${data.data[i].id}" onclick="del(event);" href="javaScript:;" target="_blank">删&nbsp;除</a>
			                        </td>
			                    </tr>`	
					$(".user-home-order table").append(scenicStr);	
				}
			}else{
				alert(data.error);
			}
		},
		error : function(xhr, text, error) {
			console.log(text);
		}
	});
});

function del(event) {
	var scenicId = $(event.target).attr("scenicid");
    $.ajax({
        url: "http://127.0.0.1:8086/scenic/deleteScenicById/" + scenicId,
        type: "DELETE",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true){
				$(event.target).parent().parent().html("");
            }else{
                alert("删除景点失败");
            }
        },
        error : function(xhr, text, error) {
            alert("删除景点失败");
        }
    });
}
