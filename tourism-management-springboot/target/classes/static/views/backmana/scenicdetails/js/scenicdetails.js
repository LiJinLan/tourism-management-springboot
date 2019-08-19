$(function() {
	var getScenicStr = getCookie("scenic");
	var scenicObj = JSON.parse(getScenicStr);
	
	$(".name span").text(scenicObj.name);
	$(".address span").text(scenicObj.address);
	$(".city span").text(scenicObj.city);
	$(".grade span").text(scenicObj.grade);
	$(".adultTickets span").text(scenicObj.adultTickets);
	$(".childTickets span").text(scenicObj.childTickets);
	$(".telephone span").text(scenicObj.telephone);
	$(".recommend span").text(scenicObj.recommend);
	$(".scenicdetails textarea").text(scenicObj.introduce);

	var liStr = '<li>'
				+'<div class="img-right">'
				+ '<img src="http://127.0.0.1:8086/file/downloadFile?filePath='+ scenicObj.scenicImage +'" class="preview-img" />'
				+ '<textarea rows="11" cols="38" class="describe">'+ scenicObj.introduce +'</textarea></div>'
				+ '</li>';
	$(".scenic-images-ul").append(liStr);
})


