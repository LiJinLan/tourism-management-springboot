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
					lineStr += `<li>
			                        <div class="pic">
			                            <img class="fl" src="${imgsrc}" alt="" width="285" height="190" />
			                            <div class="buy">
			                                <a href="../../lineshow/page/index.html?id=${data.data[i].id}">立即预订</a>
			                            </div>
			                        </div>
			                        <div class="js">
			                            <a class="tit" href="../../lineshow/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
			                            <p class="attr"></p>
			                            <p class="num">
			                                <del>原价：<i class="currency_sy">￥</i>${data.data[i].originalPrice}</del>
			                                <span><b>优惠价￥${data.data[i].salePrice}</b></span>
			                            </p>
			                        </div>
			                    </li>`
					$(".st-tabcon .st-cp-list").append(lineStr);	
				}
			}else{
				alert(data.error);
			}
		},
		error : function(xhr, text, error) {
			alert(data.error);
			console.log(text);
		}
	});
});