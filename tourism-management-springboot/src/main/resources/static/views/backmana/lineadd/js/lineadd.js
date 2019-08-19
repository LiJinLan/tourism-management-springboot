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
	$(".scenicdetails textarea").text(getIntroduce);
})