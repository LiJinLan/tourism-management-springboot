$(function() {
	var getScenic = getCookie("scenic");
	var getScenicStr = JSON.parse(getScenic);
	var scenic = getScenicStr.data.scenic;
	var getName = scenic.name;
	var getAddress = scenic.address;
	var getCity = scenic.city;
	var getGrade = scenic.grade;
	var getAdultTickets = scenic.adultTickets;
	var getChildTickets = scenic.childTickets;
	var getTelephone = scenic.telephone;
	var getRecommend = scenic.recommend;
	var getIntroduce = scenic.introduce;
	
	$(".name span").text(getName);
	$(".address span").text(getAddress);
	$(".city span").text(getCity);
	$(".grade span").text(getGrade);
	$(".adultTickets span").text(getAdultTickets);
	$(".childTickets span").text(getChildTickets);
	$(".telephone span").text(getTelephone);
	$(".recommend span").text(getRecommend);
	$(".scenicmodifyshow textarea").text(getIntroduce);
})

function update() {
	var getScenic = getCookie("scenic");
	var getScenicStr = JSON.parse(getScenic);
	var scenic = getScenicStr.data.scenic;
	var getName = $(".name span").val();
	var getAddress = $(".address span").val();
	var getCity = $(".city span").val();
	var getGrade = $(".grade span").val();
	var getAdultTickets = $(".adultTickets span").val();
	var getChildTickets = $(".childTickets span").val();
	var getTelephone = $(".telephone span").val();
	var getRecommend = $(".recommend span").val();
	var getIntroduce = $(".scenicmodifyshow textarea").val();

	var scenicData = {
		"name": getName,
		"address": getAddress,
		"city": getCity,
		"grade": getGrade,
		"adultTickets": getAdultTickets,
		"childTickets": getChildTickets,
		"telephone": getTelephone,
		"recommend": getRecommend,
		"introduce": getIntroduce
	};

	$.ajax({
	    url: "http://127.0.0.1:8086/scenic/updateScenic",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(scenicData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	if(data.success==true){
	    		pnotify("成功", "修改景点成功", "success");
	    	}
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "修改景点失败", "error");
	    }
	});

}

