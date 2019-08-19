var hotelId = getQueryString("id");
$(function() {
    loadHotel();
})

function loadHotel() {
    var hotelId = getQueryString("id");
    $.ajax({
        url: "http://127.0.0.1:8086/hotel/queryHotelById/" + hotelId,
        ttype: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true && data.data != null){
                hotel = data.data.hotel;
                showHotel(hotel);
                showImages(hotel);
            }else{
                alert(data.error);
            }
        },
        error : function(xhr, text, error) {
            alert(data.error);
        }
    });
}

function showHotel(hotel) {
	$(".hotel .hotel-item input[name='name']").val(`${hotel.name}`);
	$(".hotel .hotel-item input[name='grade']").val(`${hotel.grade}`);
	$(".hotel .hotel-item input[name='province']").val(`${hotel.province}`);
	$(".hotel .hotel-item input[name='city']").val(`${hotel.city}`);
	$(".hotel .hotel-item input[name='satisfaction']").val(`${hotel.satisfaction}`);
	$(".hotel .hotel-item input[name='recommend']").val(`${hotel.recommend}`);
	$(".hotel .hotel-item input[name='originalPrice']").val(`${hotel.originalPrice}`);
	$(".hotel .hotel-item input[name='salePrice']").val(`${hotel.salePrice}`);
	$(".hotel .hotel-item input[name='homeType']").val(`${hotel.homeType}`);
    $(".hotel .hotel-item input[name='bedType']").val(`${hotel.bedType}`);
    $(".hotel .hotel-item input[name='mealSign']").val(`${hotel.mealSign}`);
    $(".hotel .hotel-item input[name='payWay']").val(`${hotel.payWay}`);
    $(".hotel .hotel-item input[name='telephone']").val(`${hotel.telephone}`);
    $(".hotel .hotel-item input[name='tradeVolume']").val(`${hotel.tradeVolume}`);
    $(".hotel .hotel-item input[name='openTime']").val(`${hotel.openTime}`);
    $(".hotel .hotel-item input[name='decorateTime']").val(`${hotel.decorateTime}`);
	$(".hotel-img-content .hotel-img-item textarea[name='introduce']").val(`${hotel.introduce}`);
	$(".hotel .hotel-item textarea[name='address']").val(`${hotel.address}`);
	$(".hotel-right .title-img").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath=" + hotel.hotelImage+ "").attr("filepath",hotel.hotelImage);
}

function updateMainImg() {
    var $imgRight = $(".hotel .hotel-right");
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

function showImages(hotel) {
    $(".hotel-images-ul").html("");
	for(var i = 0; i < hotel.imageList.length; i++) {
		var liStr = "";
		var liStr = `<li>
                <div class="img-left">
                    <span class="textarea-title">图片描述：</span>
                    <textarea rows="10" cols="83" class="describe" name="fileDesc">${hotel.imageList[i].fileDesc}</textarea>
                </div>
                <div class="img-right">
                    <img fileid=${hotel.imageList[i].id} oldfileid=${hotel.imageList[i].id} src="http://127.0.0.1:8086/file/downloadFile?filePath=${hotel.imageList[i].filePath}" class="preview-img" />
                    <input type="file">
                    <button>修改图片</button>
                </div>
            </li>`
	$(".hotel-images-ul").append(liStr);
	}
    $(".hotel-images-ul li").on("click","button",function(e) {
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
            },error:function(error){
                alert("上传失败");
            }
        });
    });
}

function hotelModify() {
    var name = $(".hotel .hotel-item input[name='name']").val();
    var grade = $(".hotel .hotel-item input[name='grade']").val();
    var province = $(".hotel .hotel-item input[name='province']").val();
    var city = $(".hotel .hotel-item input[name='city']").val();
    var satisfaction = $(".hotel .hotel-item input[name='satisfaction']").val();
    var recommend = $(".hotel .hotel-item input[name='recommend']").val();
    var originalPrice = $(".hotel .hotel-item input[name='originalPrice']").val();
    var salePrice = $(".hotel .hotel-item input[name='salePrice']").val();
    var homeType = $(".hotel .hotel-item input[name='homeType']").val();
    var bedType = $(".hotel .hotel-item input[name='bedType']").val();
    var mealSign = $(".hotel .hotel-item input[name='mealSign']").val();
    var payWay = $(".hotel .hotel-item input[name='payWay']").val();
    var telephone = $(".hotel .hotel-item input[name='telephone']").val();
    var tradeVolume = $(".hotel .hotel-item input[name='tradeVolume']").val();
    var openTime = $(".hotel .hotel-item input[name='openTime']").val();
    var decorateTime = $(".hotel .hotel-item input[name='decorateTime']").val();
    var introduce = $(".hotel-img-content .hotel-img-item textarea[name='introduce']").val();
    var address = $(".hotel .hotel-item textarea[name='address']").val();
    var hotelImage = $(".hotel .hotel-right img").attr("filepath");

    var fileIds = []; 
    $(".hotel-images-ul li").each(function(index,item){
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


    var hotelData = {
        hotel: {
            "id": hotelId,
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
            "hotelImage": hotelImage,
            "openTime": openTime,
            "decorateTime":decorateTime
        },
        hotelFile: fileIds
    };

    if(name.length == 0) {
        alert("景点名称不能为空");
        return false;
    }

    $.ajax({
        url: "http://127.0.0.1:8086/hotel/updateHotel",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(hotelData),
        dataType: "json",
        success: function successCallBack(data) {
            $(".add-hotel-btn").attr("disabled","disabled");
            if(data.success==true){
                loadHotel();
                pnotify("成功", "修改景点成功", "success");
            }
        },
        error: function errorCallBack(xhr) {
            pnotify("失败", "修改景点失败", "error");
        }
    });
}


