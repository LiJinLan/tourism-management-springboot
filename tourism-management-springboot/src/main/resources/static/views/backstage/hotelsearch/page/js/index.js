var hotel;
$(function() {
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
                resetHotel();
            }else{
                alert(data.error);
            }
        },
        error : function(xhr, text, error) {
            alert(data.error);
        }
    });
})

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
	$(".hotel-right .title-img").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath=" + hotel.hotelImage+ "");
}


function showImages(hotel) {
	for(var i = 0; i < hotel.imageList.length; i++) {
		var liStr = "";
		var liStr = `<li>
                <div class="img-left">
                    <span class="textarea-title">图片描述：</span>
                    <textarea rows="10" cols="83" class="describe" name="fileDesc">${hotel.imageList[i].fileDesc}</textarea>
                </div>
                <div class="img-right">
                    <img src="http://127.0.0.1:8086/file/downloadFile?filePath=${hotel.imageList[i].filePath}" class="preview-img" />
                </div>
            </li>`
	$(".hotel-images-ul").append(liStr);
	}
}


function resetHotel() {
	$(".personal-data input").attr("disabled","disabled");
	$(".personal-data textarea").attr("disabled","disabled");
}
