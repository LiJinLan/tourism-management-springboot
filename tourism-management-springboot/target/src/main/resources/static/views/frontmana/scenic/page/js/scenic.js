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
					scenicStr += '<li><i class="hot-ico"></i>'
								+ '<a class="pic" name='+ data.data[i].id + ' href="../../showscenic/page/index.html?id='+ data.data[i].id + '" target="_blank">'
								+ '<img src=' + imgsrc +' alt='+ data.data[i].name +'></a>'
								+ '<p class="tit"><a name='+ data.data[i].id +' href="../../showscenic/page/index.html?id='+ data.data[i].id + '" target="_blank">'+ data.data[i].name +'</a></p>'
								+ '<p class="data"><del>原价：<i class="currency_sy">￥</i>'+ data.data[i].originalPrice +'</del>'
								+ '<span><b><i class="currency_sy">￥</i>'+ data.data[i].salePrice +'</b>起</span>'
								+ '</p></li>';	
					$("#inland ul").append(scenicStr);	
				}
				console.log(data);
			}else{
				alert(data.error);
			}
		},
		error : function(xhr, text, error) {
			console.log(text);
		}
	});
});


