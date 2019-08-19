var keyType = "";
$(function() {
	$(".searchmodel").on("click","li",function(){
	    keyType = $(this).attr('data-url');
	    var typename = $(this).text();
	    $("#typename").html(typename+'<i></i>');
	})
	function getUrlParam(key) {
	    // 获取参数
	    var url = window.location.search;
	    // 正则筛选地址栏
	    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	    // 匹配目标参数
	    var result = url.substr(1).match(reg);
	    //返回参数值
	    return result ? decodeURIComponent(result[2]) : null;
	}

	var keyWord = getUrlParam("keyword");
	var type = getUrlParam("type");
	var reqData = {
		type: type,
		keyWord: keyWord
	}
	$.ajax({
		url: "http://127.0.0.1:8086/search/searchByKeyWord",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify(reqData),
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				if(type == "hotel") {
					var hotel = data.data.hotel;
					hotelShow(hotel);
				}
				else if(type == "scenic") {
					var scenic = data.data.scenic;
					scenicShow(scenic);
				}
				else if(type == "line") {
					var line = data.data.line;
					lineShow(line);
				}
			    else if(type == "all") {
					var hotel = data.data.hotel;
					hotelShow(hotel);

					var scenic = data.data.scenic;
					scenicShow(scenic);

					var line = data.data.line;
					lineShow(line);
				}
			}else{
				alert("失败");
			}
		},
		error : function(xhr, text, error) {
			alert("失败");
		}
	});
});

function hotelShow(hotel) {
	for(var i = 0; i < hotel.length; i++) {
		var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + hotel[i].hotelImage;
		var scenicStr = "";
		scenicStr += '<li><i class="hot-ico"></i>'
					+ '<a class="pic" name='+ hotel[i].id + ' href="../../hotelshow/page/index.html?id='+ hotel[i].id + '" target="_blank">'
					+ '<img src=' + imgsrc +' alt='+ hotel[i].name +'></a>'
					+ '<p class="tit"><a name='+ hotel[i].id +' href="../../hotelshow/page/index.html?id='+ hotel[i].id + '" target="_blank">'+ hotel[i].name +'</a></p>'
					+ '<p class="data"><del>原价：<i class="currency_sy">￥</i>'+ hotel[i].originalPrice +'</del>'
					+ '<span><b><i class="currency_sy">优惠价￥</i>'+ hotel[i].salePrice +'</b></span>'
					+ '</p>'
					+ '<p class="tit">'+ hotel[i].province +'省  '+ hotel[i].city +'市</p>'
					+ '<p class="tit">具体地址：'+ hotel[i].address +'</p>'
					+ '<p class="tit">酒店简介：'+ hotel[i].introduce  +'</p></li>';
		$("#inland ul").append(scenicStr);	
	}
}

function scenicShow(scenic) {
	for(var i = 0; i < scenic.length; i++) {
		var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + scenic[i].scenicImage;
		var scenicStr = "";
		scenicStr += '<li><i class="hot-ico"></i>'
					+ '<a class="pic" name='+ scenic[i].id + ' href="../../showscenic/page/index.html?id='+ scenic[i].id + '" target="_blank">'
					+ '<img src=' + imgsrc +' alt='+ scenic[i].name +'></a>'
					+ '<p class="tit"><a name='+ scenic[i].id +' href="../../showscenic/page/index.html?id='+ scenic[i].id + '" target="_blank">'+ scenic[i].name +'</a></p>'
					+ '<p class="data"><del>原价：<i class="currency_sy">￥</i>'+ scenic[i].originalPrice +'</del>'
					+ '<span><b><i class="currency_sy">优惠价￥</i>'+ scenic[i].salePrice +'</b></span>'
					+ '</p>'
					+ '<p class="tit">'+ scenic[i].province +'省  '+ scenic[i].city +'市</p>'
					+ '<p class="tit">具体地址：'+ scenic[i].address +'</p>'
					+ '<p class="tit">景点简介：'+ scenic[i].introduce  +'</p></li>';
		$("#inland ul").append(scenicStr);	
	}
}

function lineShow(line) {
	for(var i = 0; i < line.length; i++) {
		var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + line[i].lineImage;
		var scenicStr = "";
		scenicStr += '<li><i class="hot-ico"></i>'
					+ '<a class="pic" name='+ line[i].id + ' href="../../lineshow/page/index.html?id='+ line[i].id + '" target="_blank">'
					+ '<img src=' + imgsrc +' alt='+ line[i].name +'></a>'
					+ '<p class="tit"><a name='+ line[i].id +' href="../../lineshow/page/index.html?id='+ line[i].id + '" target="_blank">'+ line[i].name +'</a></p>'
					+ '<p class="data"><del>原价：<i class="currency_sy">￥</i>'+ line[i].originalPrice +'</del>'
					+ '<span><b><i class="currency_sy">优惠价￥</i>'+ line[i].salePrice +'</b></span>'
					+ '</p>'
					+ '<p class="tit">线路套餐：'+ line[i].mealSign +'</p>'
					+ '<p class="tit">线路特色：'+ line[i].lineFeature +'</p></li>';	
		$("#inland ul").append(scenicStr);	
	}
}

function searchKey() {
    var keyWord = $(".st-top-search .searchkeyword").val();
    var type = keyType;
	var reqData = {
		type: keyType,
		keyWord: keyWord
	}

	$.ajax({
		url: "http://127.0.0.1:8086/search/searchByKeyWord",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify(reqData),
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				$("#inland ul").html("");
				if(type == "hotel") {
					var hotel = data.data.hotel;
					hotelShow(hotel);
				}
				else if(type == "scenic") {
					var scenic = data.data.scenic;
					scenicShow(scenic);
				}
				else if(type == "line") {
					var line = data.data.line;
					lineShow(line);
				}
			    else if(type == "all") {
					var hotel = data.data.hotel;
					hotelShow(hotel);

					var scenic = data.data.scenic;
					scenicShow(scenic);

					var line = data.data.line;
					lineShow(line);
				}
			}else{
				alert("222");
			}
		},
		error : function(xhr, text, error) {
			alert("3333");
		}
	});
}

