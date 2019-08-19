var scenic;
$(function() {
    var scenicId = getQueryString("id");
    $.ajax({
        url: "http://127.0.0.1:8086/scenic/queryScenicById/" + scenicId,
        ttype: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true && data.data != null){
                scenic = data.data.scenic;
                showScenic(scenic);
                showImages(scenic);
                resetScenic();
            }else{
                alert(data.error);
            }
        },
        error : function(xhr, text, error) {
            alert(data.error);
        }
    });
})

function showScenic(scenic) {
	$(".scenic .scenic-item input[name='name']").val(`${scenic.name}`);
	$(".scenic .scenic-item input[name='grade']").val(`${scenic.grade}`);
	$(".scenic .scenic-item input[name='province']").val(`${scenic.province}`);
	$(".scenic .scenic-item input[name='city']").val(`${scenic.city}`);
	$(".scenic .scenic-item input[name='satisfaction']").val(`${scenic.satisfaction}`);
	$(".scenic .scenic-item input[name='recommend']").val(`${scenic.recommend}`);
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
	$(".scenic-right .title-img").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath=" + scenic.scenicImage+ "");
}


function showImages(scenic) {
	for(var i = 0; i < scenic.imageList.length; i++) {
		var liStr = "";
		var liStr = `<li>
                <div class="img-left">
                    <span class="textarea-title">图片描述：</span>
                    <textarea rows="10" cols="83" class="describe" name="fileDesc">${scenic.imageList[i].fileDesc}</textarea>
                </div>
                <div class="img-right">
                    <img src="http://127.0.0.1:8086/file/downloadFile?filePath=${scenic.imageList[i].filePath}" class="preview-img" />
                </div>
            </li>`
	$(".scenic-images-ul").append(liStr);
	}
}


function resetScenic() {
	$(".personal-data input").attr("disabled","disabled");
	$(".personal-data textarea").attr("disabled","disabled");
}
