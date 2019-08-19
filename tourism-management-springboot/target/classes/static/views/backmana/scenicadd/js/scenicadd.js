var fileIds = [];   //景点所关联的图片数组
var scenicImage = "";
function add() {
	var getName = $(".scenic input[name='name']").val();
	var getGrade = $('.scenic select option:selected') .text();
	var getAdultTickets = $(".scenic input[name='adultTickets']").val();
	var getChildTickets = $(".scenic input[name='childTickets']").val();
	var getTelephone = $(".scenic input[name='telephone']").val();
	var getCity = $(".scenic input[name='city']").val();
	var getAddress = $(".scenic input[name='address']").val();
	var getRecommend = $(".scenic input[type='radio']:checked").val();
	var getIntroduce = $(".scenic textarea").val();

	var addData = {
		"id": getId(),
		"name": getName,
		"grade": getGrade,
		"adultTickets": getAdultTickets,
		"childTickets": getChildTickets,
		"telephone": getTelephone,
		"city": getCity,
		"address": getAddress,
		"recommend": getRecommend,
		"introduce": getIntroduce,
		"fileIds": fileIds,
		"scenicImage": scenicImage
	};
	if(getName.length == 0) {
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
        	$(".add-scenic-btn").removeAttr("disabled");
        	for(var i= 0; i< data.data.length; i++){
        		fileIds.push(data["data"][i]["id"]);
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
	var liLength = $(".scenic-images-ul li").length;
	if(liLength == 0) {
		$(".upload-image-btn").removeAttr("disabled");
	}
	var liStr = '<li>'
				+'<div class="img-left"><p>上传图片：</p>'
				+'<input type="file" name="file' + liLength + '" class="sub-image" />'
				+ '<img src="" class="preview-img" /></div>'
				+'<div class="img-right"><p>图片描述：</p>'
				+ '<textarea rows="5" cols="81" class="describe" name="fileDesc' + liLength + '" ></textarea></div>'
				+ '</li>';
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
        	$(".add-scenic-btn").removeAttr("disabled");
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
	$(".scenic input[name='name']").val("");
	$('.scenic select option:selected') .val("");
	$(".scenic input[name='adultTickets']").val("");
	$(".scenic input[name='childTickets']").val("");
	$(".scenic input[name='telephone']").val("");
	$(".scenic input[name='city']").val("");
	$(".scenic input[name='address']").val("");
	$(".scenic input[type='radio']:checked").val("");
	$(".scenic textarea").val("");
	$(".scenic-images-ul").html("");
	$(".upload-image-btn").attr("disabled","disabled");
	$(".title-img").hide();
	$(".scenic-right .file").show();
	$(".scenic-right .file").append("<input type='file' name='title-image' class='title-image' />");
	$(".scenic-right button").show();
}
