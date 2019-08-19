function query() {
	var getName = $(".scenic input[name='name']").val();
	var getCity = $(".scenic input[name='city']").val();
	if(getName.length == 0){
		alert("景点名称不能为空");
		return false;
	}
	if(getCity.length == 0){
		alert("景点地址不能为空");
		return false;
	}
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
	    		setCookie("scenic", JSON.stringify(data.data.scenic) );
	    		pnotify("成功", "查找景点成功", "success");
	    		window.location.href = "../scenicdetails/scenicdetails.html";
	    	}
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "找不到此景点", "error");
	    }
	});
}

function reset() {
	var getName = $(".scenic input[name='name']").val("");
	var getAddress = $(".scenic input[name='address']").val("");
}

