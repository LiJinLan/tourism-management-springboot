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
					hotelStr += `<li >
				                    <div class="pic">
				                        <a href="../../hotelshow/page/index.html?id=${data.data[i].id}">
				                        <img src="${imgsrc}" alt="" / width="277px" height="195px"></a>
				                    </div>
				                    <div class="txt">
				                        <p class="bt"><a href="../../hotelshow/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a><span>电询</span></p>
				                        <p class="num"><span>满意度：${data.data[i].satisfaction}</span><span>销量：${data.data[i].tradeVolume}</span></p>
				                        <p class="ads"><span>${data.data[i].address}</span></p>
				                    </div>
				                    <div class="list">
				                        <a href="../../hotelshow/page/index.html?id=${data.data[i].id}" target="_blank">
				                            <span>${data.data[i].homeType}</span>
				                            <em>电询</em>
				                        </a>
				                    </div>
				                    <a class="more-fx" href="../../hotelshow/page/index.html?id=${data.data[i].id}" target="_blank">更多房型</a>
				                </li>`
					$(".hotel-jx-box ul").append(hotelStr);	
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