var fileIds = [];   //酒店所关联的图片数组
var hotelImage = "";
function addHotel() {
	var name = $(".hotel .hotel-item input[name='name']").val();
	var grade = $('.hotel .hotel-item select[name="grade"] option:selected') .text();
	var province = $(".hotel .hotel-item input[name='province']").val();
	var city = $(".hotel .hotel-item input[name='city']").val();
	var satisfaction = $(".hotel .hotel-item input[name='satisfaction']").val();
	var recommend = $(".hotel .hotel-item input[type='radio']:checked").val();
	var originalPrice = $(".hotel .hotel-item input[name='originalPrice']").val();
	var salePrice = $(".hotel .hotel-item input[name='salePrice']").val();
	var homeType = $(".hotel .hotel-item select[name='homeType'] option:selected") .text();
	var bedType = $(".hotel .hotel-item select[name='bedType'] option:selected") .text();
	var mealSign = $(".hotel .hotel-item select[name='mealSign'] option:selected") .text();
	var payWay = $(".hotel .hotel-item input[name='payWay']").val();
	var telephone = $(".hotel .hotel-item input[name='telephone']").val();
	var tradeVolume = $(".hotel .hotel-item input[name='tradeVolume']").val();
	var introduce = $(".hotel .hotel-item textarea[name='introduce']").val();
	var address = $(".hotel .hotel-item textarea[name='address']").val();
	var openTime = $(".hotel .hotel-item input[name='openTime']").val();
	var decorateTime = $(".hotel .hotel-item input[name='decorateTime']").val();

	var addData = {
		"name": name,
		"grade": grade,
		"province": province,
		"city": city,
		"satisfaction": satisfaction,
		"recommend": recommend,
		"originalPrice": originalPrice,
		"salePrice": salePrice,
		"homeType": homeType,
		"bedType": bedType,
		"mealSign": mealSign,
		"payWay": payWay,
		"telephone": telephone,
		"introduce": introduce,
		"address": address,
		"tradeVolume": tradeVolume,
		"openTime": openTime,
		"decorateTime": decorateTime,
		"hotelImage": hotelImage,
		"fileIds": fileIds
	};
	if(name.length == 0) {
		alert("酒店名称不能为空");
		return false;
	}
	var open = $(".hotel .hotel-item input[name='openTime']").val();
	var decotate = $(".hotel .hotel-item input[name='decorateTime']").val();
	/*if(!(/^([0-9]{4})-(([0-9]{1})||(1[0-2]{1}))-(([0-2]{1})[0-9]{1}||([0-9]{1})||(3[0-1]{1}))$/.test(open)) ) {
		return false;
	}
	if(!(/^([0-9]{4})-(([0-9]{1})||(1[0-2]{1}))-(([0-2]{1})[0-9]{1}||([0-9]{1})||(3[0-1]{1}))$/.test(decotate)) ) {
		return false;
	}*/

	$.ajax({
	    url: "http://127.0.0.1:8086/hotel/addHotel",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(addData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	$(".add-hotel-btn").attr("disabled","disabled");
	    	if(data.success==true){
	    		pnotify("成功", "新增酒店成功", "success");
	    	} 
	    	resetHotel();
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "酒店已存在", "error");
	    }
	});
}

function showImage() {
	var fd = new FormData();
	$(".title-image").each(function(index,item){
		fd.append("file",item.files[0]);
	});
	
    $.ajax({
    	type: "POST",
        url: "http://127.0.0.1:8086/file/upload",
        data: fd,
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
        	$(".hotel-submit-control button").removeAttr("disabled");
        	for(var i= 0; i< data.data.length; i++){
        		hotelImage = ""+data["data"][i]["filePath"];
        	}
        	$(".hotel-right").each(function(index,item){
        		$(item).find(".file").hide();
        		$(item).find("input").hide();
        		$(item).find("button").hide();
        		$(item).find("img").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath="+data["data"][index]["filePath"]).show();
        	});
        },error:function(error){
        	alert("上传失败");
        }
    });
}

function addImages() {
	$(".hotel-submit-control button").attr("disabled","disabled");
	var liLength = $(".hotel-images-ul li").length;
	if(liLength == 0) {
		$(".upload-image-btn").removeAttr("disabled");
	}
	var liStr = `<li>
                    <div class="img-left">
                        <span class="textarea-title">图片描述：</span>
                        <textarea rows="5" cols="64" class="describe" name="fileDesc${liLength}"></textarea>
                    </div>
                    <div class="img-right">
                        <input type="file" name="file${liLength}" class="sub-image" />
                        <img src="" class="preview-img" />
                    </div>
                </li>`
	$(".hotel-images-ul").append(liStr);
}


function uploadImagesBtn() {
	var fd = new FormData();
	$(".sub-image").each(function(index,item){
		fd.append("file",item.files[0]);
		var text = $(item).parent().parent().find("textarea").val();;
		fd.append("fileDesc"+index,text);
		console.log(text);
	});
	
    $.ajax({
    	type: "POST",
        url: "http://127.0.0.1:8086/file/upload",
        data: fd,
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
        	$(".hotel-submit-control button").removeAttr("disabled");
        	for(var i= 0; i< data.data.length; i++){
        		fileIds.push(data["data"][i]["id"]);
        	}
        	
        	$(".hotel-images-ul li").each(function(index,item){
        		$(item).find("input").hide();
        		$(item).find("img").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath="+data["data"][index]["filePath"]).show();
        	});
        },error:function(error){
        	alert("上传失败");
        }
    });
}


function resetHotel() {
	$(".hotel .hotel-item input[name='name']").val('');
	$(".hotel .hotel-item input[name='province']").val('');
	$(".hotel .hotel-item input[name='city']").val('');
	$(".hotel .hotel-item input[name='satisfaction']").val('');
	$(".hotel .hotel-item input[type='radio']:checked").val('');
	$(".hotel .hotel-item input[name='originalPrice']").val('');
	$(".hotel .hotel-item input[name='salePrice']").val('');
	$(".hotel .hotel-item input[name='childPrice']").val('');
	$(".hotel .hotel-item input[name='childSale']").val('');
	$(".hotel .hotel-item input[name='ticketWay']").val('');
	$(".hotel .hotel-item input[name='payWay']").val('');
	$(".hotel .hotel-item input[name='telephone']").val('');
	$(".hotel .hotel-item input[name='tradeVolume']").val('');
	$(".hotel .hotel-item textarea[name='introduce']").val('');
	$(".hotel .hotel-item textarea[name='address']").val('');
	$(".hotel .hotel-item textarea[name='orderNotice']").val('');
	$(".hotel .hotel-item input[name='openTime']").val('');
	$(".hotel .hotel-item input[name='decorateTime']").val('');
	$(".hotel-images-ul").html("");
	$(".upload-image-btn").attr("disabled","disabled");
	$(".hotel-submit-control button").attr("disabled","disabled");

	$(".hotel-right .title-image").val("").show();
	$(".hotel-right button").show();
	$(".hotel-right img").attr("src","").hide();
}
