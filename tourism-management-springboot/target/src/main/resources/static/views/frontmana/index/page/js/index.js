$(function() {
	line();
	hotel();
	scenic();
	$(".st-tabnav").on("mouseover","#lineStrategy",function(){
		$(".lineRecommendChoice").css("display","block");
	});

	$(".lineRecommendChoice").on("mouseleave",function(){
		$(".lineRecommendChoice").css("display","none");
	});

	
	$(".lineRecommendChoice .Recommend-div").each(function(index, item ){
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


/*function queryRecommend(){
	var vals = [];
	$('input[type="checkbox"]:checked').each(function(index, item) {
		vals.push($(this).val());
		
	});
	$('input[type="text"]').each(function(index, item) {
		if($(this).val() != "")
		vals.push($(this).val());
	});
	console.log(vals);
	
	var choiceArray = [];
	$(".Recommend-divRight-ul").each(function(index, item) {
		objName = $(item).attr("id");
		var choiceObj = {};
		
		choiceObj.name = objName;
		choiceObj.children = [];
		var inputList = $("input[name='" + objName + "']");
		$.map(inputList, function(itemMap, indexMap) {
			if(indexMap == (inputList.length-1) ) {
				if($(itemMap).val()) {
					choiceObj.children.push( $(itemMap).val() );
				}
			} else { 
				if( $(itemMap).attr("checked") ) {
					choiceObj.children.push( $(itemMap).val() );
				}				
			}
		});
		
		choiceArray.push(choiceObj);		
	});
	console.log(choiceArray);
}
*/

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
			/*
			查询线路结束后，将查询勾选的条件清除
			*/
			//$(".lineRecommendChoice .Recommend-div").find(".Recommend-divRight-ul input[type='checkbox']").attr("checked",false);
			//$(".lineRecommendChoice .Recommend-div").find(".Recommend-divRight-ul input[type='text']").val("");
		},
		error: function errorCallBack( data ) {
			console.log(data);
		}

	});	
}

