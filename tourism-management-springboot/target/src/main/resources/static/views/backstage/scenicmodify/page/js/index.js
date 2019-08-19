var scenicId = getQueryString("id");
$(function() {
    loadScenic();
});

function loadScenic() {
	$.ajax({
        url: "http://127.0.0.1:8086/scenic/queryScenicById/" + scenicId,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true && data.data != null){
                scenic = data.data.scenic;
                showScenic(scenic);
                showImages(scenic);
            }else{
                alert(data.error);
            }
        },
        error : function(xhr, text, error) {
            alert(data.error);
        }
    });
}


function showScenic(scenic) {
	$(".scenic .scenic-item input[name='name']").val(`${scenic.name}`);
	$('.scenic .scenic-item select option:selected').val(`${scenic.grade}`);
	$(".scenic .scenic-item input[name='province']").val(`${scenic.province}`);
	$(".scenic .scenic-item input[name='city']").val(`${scenic.city}`);
	$(".scenic .scenic-item input[name='satisfaction']").val(`${scenic.satisfaction}`);
	$(".scenic .scenic-item input[type='radio']:checked").val(`${scenic.recommend}`);
	$(".scenic .scenic-item input[name='originalPrice']").val(`${scenic.originalPrice}`);
	$(".scenic .scenic-item input[name='salePrice']").val(`${scenic.salePrice}`);
	$(".scenic .scenic-item input[name='childPrice']").val(`${scenic.childPrice}`);
	$(".scenic .scenic-item input[name='childSale']").val(`${scenic.childSale}`);
	$(".scenic .scenic-item input[name='ticketWay']").val(`${scenic.ticketWay}`);
	$(".scenic .scenic-item input[name='payWay']").val(`${scenic.payWay}`);
	$(".scenic .scenic-item input[name='telephone']").val(`${scenic.telephone}`);
	$(".scenic .scenic-item input[name='tradeVolume']").val(`${scenic.tradeVolume}`);
	$(".scenic-img-content .scenic-img-item textarea[name='introduce']").val(`${scenic.introduce}`);
	$(".scenic .scenic-item textarea[name='address']").val(`${scenic.address}`);
	$(".scenic-img-content .scenic-img-item textarea[name='orderNotice']").val(`${scenic.orderNotice}`);
	$(".scenic-right .title-img").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath=" + scenic.scenicImage+ "").attr("filepath",scenic.scenicImage);
}

function updateMainImg() {
	var $imgRight = $(".scenic .scenic-right");
	var $input = $imgRight.find("input")[0];
	var fd = new FormData();
	fd.append("file",$input.files[0]);
	fd.append("fileDesc"+0,"");
	$.ajax({
    	type: "POST",
        url: "http://127.0.0.1:8086/file/upload",
        data: fd,
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
        	$imgRight.find("input").val("");
        	$imgRight.find("img").attr("filepath",data["data"][0]["filePath"]).attr("src","http://127.0.0.1:8086/file/downloadFile?filePath="+data["data"][0]["filePath"]).show();
        },error:function(error){
        	alert("上传失败");
        }
    });
}


function showImages(scenic) {
	$(".scenic-images-ul").html("");
	for(var i = 0; i < scenic.imageList.length; i++) {
		var liStr = "";
		var liStr = `<li>
		                <div class="img-left">
		                    <span class="textarea-title">图片描述：</span>
		                    <textarea rows="10" cols="83" class="describe" name="fileDesc">${scenic.imageList[i].fileDesc}</textarea>
		                </div>
		                <div class="img-right">
		                    <img fileid=${scenic.imageList[i].id} oldfileid=${scenic.imageList[i].id} src="http://127.0.0.1:8086/file/downloadFile?filePath=${scenic.imageList[i].filePath}" class="preview-img" />
		                    <input type="file">
		                    <button>修改图片</button>
		                </div>
		            </li>`
	$(".scenic-images-ul").append(liStr);
	}
	$(".scenic-images-ul li").on("click","button",function(e) {
		var $imgRight = $(e.target).parent();
		var $input = $imgRight.find("input")[0];
		var fd = new FormData();
		fd.append("file",$input.files[0]);
		var text = $imgRight.parent().find(".img-left").find("textarea").val();
		fd.append("fileDesc"+0,text);
		
	    $.ajax({
	    	type: "POST",
	        url: "http://127.0.0.1:8086/file/upload",
	        data: fd,
	        async: false,
	        cache: false,
	        processData: false,
	        contentType: false,
	        success: function (data) {
	        	$imgRight.find("input").val("");
	        	$imgRight.find("img").attr("fileid",data["data"][0]["id"]).attr("src","http://127.0.0.1:8086/file/downloadFile?filePath="+data["data"][0]["filePath"]).show();
	        	/*
	        	data["data"][0]["id"]意思是指data是一个对象，"data"是对象的属性，属性的值是数组，
	        	该数组又是一个对象，对象的属性为"id",数据结构如下：
	        	{
					"data":[{
								"id":
							}
						   ]
				}
				data对象data数组第一个元素对象的id的值

				(data对象属性名为“data”的属性值，属性值为数组第一个元素的对象，并且对象的属性名为“id”的属性值)
	        	*/
	        },error:function(error){
	        	alert("上传失败");
	        }
	    });
	});

}

function scenicModify() {
	var name = $(".scenic .scenic-item input[name='name']").val();
	var grade = $('.scenic .scenic-item select option:selected').text();
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
	var introduce = $(".scenic-img-content .scenic-img-item textarea[name='introduce']").val();
	var address = $(".scenic .scenic-item textarea[name='address']").val();
	var orderNotice = $(".scenic-img-content .scenic-img-item textarea[name='orderNotice']").val();
	var scenicImage = $(".scenic .scenic-right img").attr("filepath");

	var fileIds = []; 
	$(".scenic-images-ul li").each(function(index,item){
		var $img = $(item).find(".img-right").find("img");
		var tempFileId = $img.attr("fileid");
		var tempOldFileId = $img.attr("oldfileid");
		if(tempFileId !=  tempOldFileId)  {
			fileIds.push({
				oldFileId: tempOldFileId,
				newFileId: tempFileId
			});
		}
		
	});


	var scenicData = {
		scenic: {
			"id": scenicId,
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
			"scenicImage": scenicImage
		},
		scenicFile: fileIds
	};

	if(name.length == 0) {
		alert("景点名称不能为空");
		return false;
	}

	$.ajax({
	    url: "http://127.0.0.1:8086/scenic/updateScenic",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(scenicData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	$(".add-scenic-btn").attr("disabled","disabled");
	    	if(data.success==true){
	    		loadScenic();
	    		pnotify("成功", "修改景点成功", "success");
	    	}
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "修改景点失败", "error");
	    }
	});
}



