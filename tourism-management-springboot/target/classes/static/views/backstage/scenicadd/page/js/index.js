var fileIds = [];   //景点所关联的图片数组
var scenicImage = "";
function addScenic() {
	var name = $(".scenic .scenic-item input[name='name']").val();
	var grade = $('.scenic .scenic-item select option:selected') .text();
	var province = $(".scenic .scenic-item input[name='province']").val();
	var city = $(".scenic .scenic-item input[name='city']").val();
	var satisfaction = $(".scenic .scenic-item input[name='satisfaction']").val();
	var recommend = $(".scenic .scenic-item input[type='radio']:checked").val();
	var originalPrice = $(".scenic .scenic-item input[name='originalPrice']").val();
	var salePrice = $(".scenic .scenic-item input[name='salePrice']").val();
	var childPrice = $(".scenic .scenic-item input[name='childPrice']").val();
	var childSale = $(".scenic .scenic-item input[name='childSale']").val();
	var ticketWay = $(".scenic .scenic-item input[name='ticketWay']").val();
	var payWay = $(".scenic .scenic-item input[name='payWay']").val();
	var telephone = $(".scenic .scenic-item input[name='telephone']").val();
	var tradeVolume = $(".scenic .scenic-item input[name='tradeVolume']").val();
	var introduce = $(".scenic .scenic-item textarea[name='introduce']").val();
	var address = $(".scenic .scenic-item textarea[name='address']").val();
	var orderNotice = $(".scenic .scenic-item textarea[name='orderNotice']").val();

	var addData = {
		"name": name,
		"grade": grade,
		"province": province,
		"city": city,
		"satisfaction": satisfaction,
		"recommend": recommend,
		"originalPrice": originalPrice,
		"salePrice": salePrice,
		"childPrice": childPrice,
		"childSale": childSale,
		"ticketWay": ticketWay,
		"payWay": payWay,
		"telephone": telephone,
		"introduce": introduce,
		"address": address,
		"tradeVolume": tradeVolume,
		"orderNotice": orderNotice,
		"scenicImage": scenicImage,
		"fileIds": fileIds
	};
	if(name.length == 0) {
		alert("景点名称不能为空");
		return false;
	}

	$.ajax({
	    url: "http://127.0.0.1:8086/scenic/addScenic",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(addData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	$(".add-scenic-btn").attr("disabled","disabled");
	    	if(data.success==true){
	    		pnotify("成功", "新增景点成功", "success");
	    	} 
	    	resetScenic();
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "景点已存在", "error");
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
        	$(".scenic-submit-control button").removeAttr("disabled");
        	for(var i= 0; i< data.data.length; i++){
        		scenicImage = ""+data["data"][i]["filePath"];
        	}
        	$(".scenic-right").each(function(index,item){
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
	$(".scenic-submit-control button").attr("disabled","disabled");
	var liLength = $(".scenic-images-ul li").length;
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
	$(".scenic-images-ul").append(liStr);
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
        	$(".scenic-submit-control button").removeAttr("disabled");
        	for(var i= 0; i< data.data.length; i++){
        		fileIds.push(data["data"][i]["id"]);
        	}
        	
        	$(".scenic-images-ul li").each(function(index,item){
        		$(item).find("input").hide();
        		$(item).find("img").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath="+data["data"][index]["filePath"]).show();
        	});
        },error:function(error){
        	alert("上传失败");
        }
    });
}


function resetScenic() {
	$(".scenic .scenic-item input[name='name']").val('');
	$('.scenic .scenic-item select option:selected').val('');
	$(".scenic .scenic-item input[name='province']").val('');
	$(".scenic .scenic-item input[name='city']").val('');
	$(".scenic .scenic-item input[name='satisfaction']").val('');
	$(".scenic .scenic-item input[type='radio']:checked").val('');
	$(".scenic .scenic-item input[name='originalPrice']").val('');
	$(".scenic .scenic-item input[name='salePrice']").val('');
	$(".scenic .scenic-item input[name='childPrice']").val('');
	$(".scenic .scenic-item input[name='childSale']").val('');
	$(".scenic .scenic-item input[name='ticketWay']").val('');
	$(".scenic .scenic-item input[name='payWay']").val('');
	$(".scenic .scenic-item input[name='telephone']").val('');
	$(".scenic .scenic-item input[name='tradeVolume']").val('');
	$(".scenic .scenic-item textarea[name='introduce']").val('');
	$(".scenic .scenic-item textarea[name='address']").val('');
	$(".scenic .scenic-item textarea[name='orderNotice']").val('');
	$(".scenic-images-ul").html("");
	$(".upload-image-btn").attr("disabled","disabled");
	$(".scenic-submit-control button").attr("disabled","disabled");

	$(".scenic-right .title-image").val("").show();
	$(".scenic-right button").show();
	$(".scenic-right img").attr("src","").hide();
}
