$(function() {
	var getScenic = getCookie("scenic");
	var getScenicStr = JSON.parse(getScenic);
	var scenicAll = getScenicStr.data.scenicAll;

	var temp = "";
	for(var i = 0; i < scenicAll.length; i++){
		temp += "<tr class='list'><td name='name'>"+  scenicAll[i].name +"</td>";
		temp += "<td name='address'>"+  scenicAll[i].city +"</td>";
		temp += "<td><a href='#' class='td3' onclick='modifyData(event)'>修改</a></td>";
		temp += "<td><input type='checkbox' name='select' class='checkbox'></td></tr>"
	}
	$(".scenic .table").append(temp);

	$(".scenicmodify input[name='allsel']").on("click",function() {
		if($(this).is(':checked')) {
			$(".scenicmodify input[name='select']").prop("checked",true);
		}else{
			$(".scenicmodify input[name='select']").prop("checked",false);
		}
	})

	$(".scenicmodify input[name='select']").on("click",function() {
		var allSel = false;
		$(".scenicmodify input[name='select']").each(function() {
			if(!$(this).is(':checked')) {
				allSel = true;
			}
		})
		if(allSel) {
			$(".scenicmodify input[name='allsel']").prop("checked",false);
		}else{
			$(".scenicmodify input[name='allsel']").prop("checked",true);
		}
	})
})

function del() {
	var items = $(".scenicmodify input[name='select']:checked");
	var len = items.length;
	for(var i = 0;i < len; i++) {
		$(items[i]).parents(".scenicmodify .list").remove();
	}
}

function modifyData(event) {
	var getScenic = getCookie("scenic");
	var getScenicStr = JSON.parse(getScenic);
	var scenicAll = getScenicStr.data.scenicAll;
	var getName = $(event.target).parent().parent().find("td:eq(0)").text();
	var getCity = $(event.target).parent().parent().find("td:eq(1)").text();

	var queryData = {
		"name": getName,
		"city": getCity
	};

	$.ajax({
	    url: "http://127.0.0.1:8086/scenic/queryScenicByNameCity",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(queryData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true && data.data != null){
	    		setCookie("scenic", JSON.stringify(data) );
	    		pnotify("成功", "查找景点成功", "success");
	    		window.location.href = "../scenicmodifyshow/scenicmodifyshow.html";
	    	}
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "找不到此景点", "error");
	    }
	});
}

