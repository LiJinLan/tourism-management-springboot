var allLine;
$(function() {
	$.ajax({
		url: "http://127.0.0.1:8086/line/queryLineAll",
	    type: "GET",
	    contentType: "application/json;charset=utf-8",
	    dataType: "json",
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				allLine = data.data;
				for(var i = 0; i < allLine.length; i++) {
					var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + data.data[i].lineImage;
					var lineStr = "";
					lineStr += `<tr>
			                        <td height="96px">
			                            <div width="300px" height="96px" float="left">
			                                <dl>
			                                	<dt class="linedt">
			                                	    <a href="../../../frontmana/showline/page/index.html?id=${data.data[i].id}" target="_blank">
			                                	        <img src="${imgsrc}" alt="" width="97px" height="80px">
			                                	    </a>
			                                	</dt>
			                                	<dd class="linedd">
			                                	    <a class="title" href="../../../frontmana/showline/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
			                                	    <p>编号：${data.data[i].lineNumber}</p>
			                                	    <p>类型:${data.data[i].mealSign}</p>
			                                	    <p>Tel:${data.data[i].telephone}</p>
			                                	</dd>
			                                </dl>
			                            </div>
			                        </td>
			                        <td align="center"><span class="price"><i class="currency_sy">￥</i>${data.data[i].originalPrice}</span></td>
			                        <td align="center"><span class="price"><i class="currency_sy">￥</i>${data.data[i].salePrice}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].tradeVolume}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].satisfaction}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].aheadApply}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].gobackWay}</span></td>
			                        <td align="center"><span class="dfk">${data.data[i].payWay}</span></td>
			                        <td align="center" class="operation">
			                        	<a href="../../linesearch/page/index.html?id=${data.data[i].id}" target="_blank">查看</a>
			                        	<a href="../../linemodify/page/index.html?id=${data.data[i].id}" target="_blank">修改</a>
			                        	<a lineid="${data.data[i].id}" onclick="del(event);" href="javaScript:;" target="_blank">删除</a>
			                        </td>
			                    </tr>`	
					$(".user-home-order table").append(lineStr);	
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
	var lineId = $(event.target).attr("lineid");
    $.ajax({
        url: "http://127.0.0.1:8086/line/deleteLineById/" + lineId,
        type: "DELETE",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true){
				$(event.target).parent().parent().html("");
            }else{
                alert("删除线路失败");
            }
        },
        error : function(xhr, text, error) {
            alert("删除线路失败");
        }
    });
}

