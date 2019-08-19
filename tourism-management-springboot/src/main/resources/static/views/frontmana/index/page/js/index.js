$(function() {
	line();
	hotel();
	scenic();
	//线路攻略的显示和隐藏效果
	$(".st-tabnav").on("mouseover","#lineStrategy",function(){
		$(".lineRecommendChoice").css("display","block");
	});

	$(".lineRecommendChoice").on("mouseleave",function(){
		$(".lineRecommendChoice").css("display","none");
	});
	//线路攻略的复选框单选功能
	$(".lineRecommendChoice .Recommend-div").each(function(index, item ){
		$(item).find(".Recommend-divRight-ul input[type='checkbox']").bind("click", function() {
			$(item).find(".Recommend-divRight-ul input[type='checkbox']").not(this).attr("checked",false);
		});
	});


	//酒店攻略的显示和隐藏效果
	$(".st-tabnav").on("mouseover","#hotelStrategy",function(){
		$(".hotelRecommendChoice").css("display","block");
	});

	$(".hotelRecommendChoice").on("mouseleave",function(){
		$(".hotelRecommendChoice").css("display","none");
	});
	//酒店攻略的复选框单选功能
	$(".hotelRecommendChoice .Recommend-div").each(function(index, item ){
		$(item).find(".Recommend-divRight-ul input[type='checkbox']").bind("click", function() {
			$(item).find(".Recommend-divRight-ul input[type='checkbox']").not(this).attr("checked",false);
		});
	});
	

	//景点攻略的显示和隐藏效果
	$(".st-tabnav").on("mouseover","#scenicStrategy",function(){
		$(".scenicRecommendChoice").css("display","block");
	});

	$(".scenicRecommendChoice").on("mouseleave",function(){
		$(".scenicRecommendChoice").css("display","none");
	});

	//景点攻略的复选框单选效果
	$(".scenicRecommendChoice .Recommend-div ").each(function(index, item) {
		$(item).find(".Recommend-divRight-ul input[type='checkbox']").bind("click", function() {
			$(item).find(".Recommend-divRight-ul input[type='checkbox']").not(this).attr("checked",false);
		});
	});

	
})

function line() {
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
					lineStr = `	<li>
					                <div class="pic">
					                    <img class="fl" src="${imgsrc}" alt="${data.data[i].name}" width="285" height="190" />
					                    <div class="buy">
					                        <a href="../../lineshow/page/index.html?id=${data.data[i].id}" target="_blank">立即预订</a>
					                    </div>
					                </div>
					                <div class="js">
					                    <a class="tit" href="../../lineshow/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
					                    <p class="attr">
					                    	<span>销量：${data.data[i].tradeVolume}</span>
					                    	<span class="satisfaction">${data.data[i].satisfaction} 分</span>
					                    </p>
					                    <p class="num">
					                        <del>原价：<i class="currency_sy">￥</i>${data.data[i].originalPrice}</del>
					                        <span><b>优惠价￥${data.data[i].salePrice}</b></span>
					                    </p>
					                </div>
					            </li>`
					$(".line .st-cp-list").append(lineStr);	
				}
			}else{
				alert(data.error);
			}
		},
		error : function(xhr, text, error) {
			alert(data.error);
		}
	});
}

function hotel() {
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
					hotelStr += `<li>
                                <div class="pic">
                                    <img class="fl" src="${imgsrc}" alt="${data.data[i].name}" width="285" height="190" />
                                    <div class="buy">
                                        <a href="../../hotelshow/page/index.html?id=${data.data[i].id}" target="_blank">立即预订</a>
                                    </div>
                                </div>
                                <div class="js">
                                    <a class="tit" href="../../hotelshow/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
                                    <span>${data.data[i].homeType}</span>
                                    <span class="attr">销量：${data.data[i].tradeVolume}</span>
                                    <span class="satisfaction">${data.data[i].satisfaction} 分</span>
                                    <p class="num">
					                    <del>原价：<i class="currency_sy">￥</i>${data.data[i].originalPrice}</del>
				                        <span><b>优惠价￥${data.data[i].salePrice}</b></span>
					                </p>
                                </div>
                            </li>`
					$(".hotel .st-cp-list").append(hotelStr);	
				}
			}else{
				alert(data.error);
			}
		},
		error : function(xhr, text, error) {
			alert(data.error);
		}
	});
}

function scenic() {
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
					scenicStr += `	<li>
		                                <div class="pic">
		                                    <img class="fl" src="${imgsrc}" alt="${data.data[i].name}" width="285" height="190" />
		                                    <div class="buy">
		                                        <a href="../../showscenic/page/index.html?id=${data.data[i].id}" target="_blank">立即预订</a>
		                                    </div>
		                                </div>
		                                <div class="js">
		                                    <a class="tit" href="../../showscenic/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
		                                    <p class="attr"><span>销量：${data.data[i].tradeVolume}</span><span class="satisfaction">${data.data[i].satisfaction} 分</span></p>
		                                    <p class="num">
		                                        <del>原价：<i class="currency_sy">￥</i>${data.data[i].originalPrice}</del>
		                                        <span>
		                                            <b><i class="currency_sy">优惠价￥</i>${data.data[i].salePrice}</b>
		                                        </span>
		                                    </p>
		                                </div>
		                            </li>`
					$(".scenic .st-cp-list").append(scenicStr);	
				}
			}else{
				alert(data.error);
			}
		},
		error : function(xhr, text, error) {
			alert(data.error);
		}
	});
}


//线路的推荐选择条件
function queryLineRecommend() {
	var RecommendChoice = {};
	$(".lineRecommendChoice .Recommend-div").each( function( index, item ) {
		var objName = $(item).attr("name");
		//RecommendChoicename = objName ;
		//var choiceArray = [];
		var checkList = $(item).find(".Recommend-divRight-ul li input");
		//var checkList = $("input[name='" + objName + "']");
		$.map( checkList, function(itemMap, indexMap ) {
			
			if( $(itemMap).attr("checked")) {
				//choiceArray.push( $(itemMap).val() );
				RecommendChoice[objName] = $(itemMap).val();
			} else {
				if( $(itemMap).attr("type") == "text" ) {
					if( $(itemMap).val() ) {
						//choiceArray.push( $(itemMap).val() );
						RecommendChoice[objName] = $(itemMap).val();
					}					
				}
			}
		});
		//RecommendChoice[objName] = choiceArray;
	});
	console.log(RecommendChoice);

	
	$.ajax( {
		url: "http://127.0.0.1:8086/line/queryLineRecommend",
		type: "POST",
		contentType: "application/json;charset=utf-8",
		dataType :"json",
		data: JSON.stringify( RecommendChoice ),
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				$(".line .st-cp-list").html("");	
				allLine = data.data;
				for(var i = 0; i < allLine.length; i++) {
					var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + data.data[i].lineImage;
					var lineStr = "";
					lineStr = `	<li>
					                <div class="pic">
					                    <img class="fl" src="${imgsrc}" alt="${data.data[i].name}" width="285" height="190" />
					                    <div class="buy">
					                        <a href="../../lineshow/page/index.html?id=${data.data[i].id}" target="_blank">立即预订</a>
					                    </div>
					                </div>
					                <div class="js">
					                    <a class="tit" href="../../lineshow/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
					                    <p class="attr">
					                    	<span>销量：${data.data[i].tradeVolume}</span>
					                    	<span class="satisfaction">${data.data[i].satisfaction} 分</span>
					                    </p>
					                    <p class="num">
					                        <del>原价：<i class="currency_sy">￥</i>${data.data[i].originalPrice}</del>
					                        <span><b>优惠价￥${data.data[i].salePrice}</b></span>
					                    </p>
					                </div>
					            </li>`
					$(".line .st-cp-list").append(lineStr);	
				}
			}else{
				alert("无相关条件的查询信息");
			}
			/*
			查询线路结束后，将查询勾选的条件清除
			*/
			//$(".lineRecommendChoice .Recommend-div").find(".Recommend-divRight-ul input[type='checkbox']").attr("checked",false);
			//$(".lineRecommendChoice .Recommend-div").find(".Recommend-divRight-ul input[type='text']").val("");
		},
		error: function errorCallBack( data ) {
			alert("查询失败");
		}

	});	
}


function queryHotelRecommend() {
	var RecommendChoice = {};
	$(".hotelRecommendChoice .Recommend-div").each( function( index, item ) {
		var objName = $(item).attr("name");
		var checkList = $(item).find(".Recommend-divRight-ul li input");
		//var checkList = $("input[name='" + objName + "']");
		$.map( checkList, function(itemMap, indexMap ) {			
			if( $(itemMap).attr("checked")) {
				RecommendChoice[objName] = $(itemMap).val();
			} else {
				if( $(itemMap).attr("type") == "text" ) {
					if( $(itemMap).val() ) {
						
						RecommendChoice[objName] = $(itemMap).val();
					}					
				}
			}
		});
		
	});
	console.log(RecommendChoice);

	$.ajax({
		url: "http://127.0.0.1:8086/hotel/queryHotelRecommend",
		type: "post",
		dataType: "json",
		contentType: "application/json;charset=utf-8",
		data: JSON.stringify( RecommendChoice ),
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				allHotel = data.data;
				$(".hotel .st-cp-list").html("");
				for(var i = 0; i < allHotel.length; i++) {
					var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + data.data[i].hotelImage;
					var hotelStr = "";
					hotelStr += `<li>
                                <div class="pic">
                                    <img class="fl" src="${imgsrc}" alt="${data.data[i].name}" width="285" height="190" />
                                    <div class="buy">
                                        <a href="../../hotelshow/page/index.html?id=${data.data[i].id}" target="_blank">立即预订</a>
                                    </div>
                                </div>
                                <div class="js">
                                    <a class="tit" href="../../hotelshow/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
                                    <span>${data.data[i].homeType}</span>
                                    <span class="attr">销量：${data.data[i].tradeVolume}</span>
                                    <span class="satisfaction">${data.data[i].satisfaction} 分</span>
                                    <p class="num">
					                    <del>原价：<i class="currency_sy">￥</i>${data.data[i].originalPrice}</del>
				                        <span><b>优惠价￥${data.data[i].salePrice}</b></span>
					                </p>
                                </div>
                            </li>`
					$(".hotel .st-cp-list").append(hotelStr);	
				}
			}else{
				alert("无相关条件的查询信息");
			}
		},
		error : function(xhr, text, error) {
			alert("查询失败");
		}
	});
}


function queryScenicRecommend() {
	var RecommendChoice = {};
	$('.scenicRecommendChoice .Recommend-div').each(function(index, item) {
		var objName = $(item).attr("name");
		var checkList = $(item).find(".Recommend-divRight-ul li input");
		$.map( checkList, function(itemMap, indexMap) {
			if($(itemMap).attr("checked")) {
				RecommendChoice[objName] = $(itemMap).val();
			} else {
				if( $(itemMap).attr("type") == "text") {
					if($(itemMap).val()) {
						RecommendChoice[objName] = $(itemMap).val();
					}
				}
			}
		});
		
	});
	console.log(RecommendChoice);

	$.ajax({
		url: "http://127.0.0.1:8086/scenic/queryScenicRecommend",
		type: "POST",
		dataType: "json",
		contentType: "application/json; charset:utf-8",
		data: JSON.stringify( RecommendChoice ),
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				$(".scenic .st-cp-list").html("");
				allScenic = data.data;
				for(var i = 0; i < allScenic.length; i++) {
					var imgsrc = "http://127.0.0.1:8086/file/downloadFile?filePath=" + data.data[i].scenicImage;
					var scenicStr = "";
					scenicStr += `	<li>
		                                <div class="pic">
		                                    <img class="fl" src="${imgsrc}" alt="${data.data[i].name}" width="285" height="190" />
		                                    <div class="buy">
		                                        <a href="../../showscenic/page/index.html?id=${data.data[i].id}" target="_blank">立即预订</a>
		                                    </div>
		                                </div>
		                                <div class="js">
		                                    <a class="tit" href="../../showscenic/page/index.html?id=${data.data[i].id}" target="_blank">${data.data[i].name}</a>
		                                    <p class="attr"><span>销量：${data.data[i].tradeVolume}</span><span class="satisfaction">${data.data[i].satisfaction} 分</span></p>
		                                    <p class="num">
		                                        <del>原价：<i class="currency_sy">￥</i>${data.data[i].originalPrice}</del>
		                                        <span>
		                                            <b><i class="currency_sy">优惠价￥</i>${data.data[i].salePrice}</b>
		                                        </span>
		                                    </p>
		                                </div>
		                            </li>`
					$(".scenic .st-cp-list").append(scenicStr);	
				}
			}else{
				alert("无相关条件的查询信息");
			}
		},
		error : function(xhr, text, error) {
			alert("查询失败");
		}
	});
}
	



