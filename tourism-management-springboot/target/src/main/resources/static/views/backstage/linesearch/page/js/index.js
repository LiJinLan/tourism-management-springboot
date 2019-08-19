var line;
$(function() {
    var lineId = getQueryString("id");
    $.ajax({
        url: "http://127.0.0.1:8086/line/queryLineById/" + lineId,
        ttype: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true && data.data != null){
                line = data.data.line;
                showLine(line);
                showImages(line);
                resetLine();
            }else{
                alert(data.error);
            }
        },
        error : function(xhr, text, error) {
            alert(data.error);
        }
    });
})

function showLine(line) {
	$(".line .line-item input[name='name']").val(`${line.name}`);
	$(".line .line-item input[name='mealSign']").val(`${line.mealSign}`);
	$(".line .line-item input[name='lineNumber']").val(`${line.lineNumber}`);
	$(".line .line-item input[name='gobackWay']").val(`${line.gobackWay}`);
	$(".line .line-item input[name='satisfaction']").val(`${line.satisfaction}`);
	$(".line .line-item input[name='aheadApply']").val(`${line.aheadApply}`);
	$(".line .line-item input[name='originalPrice']").val(`${line.originalPrice}`);
	$(".line .line-item input[name='salePrice']").val(`${line.salePrice}`);
	$(".line .line-item input[name='payWay']").val(`${line.payWay}`);
	$(".line .line-item input[name='telephone']").val(`${line.telephone}`);
	$(".line .line-item input[name='tradeVolume']").val(`${line.tradeVolume}`);
    $(".line .line-item input[name='address']").val(`${line.address}`);
    $(".line-img-content .line-img-item textarea[name='ContractPay']").val(`${line.ContractPay}`);
    $(".line-img-content .line-img-item textarea[name='remark']").val(`${line.remark}`);
    $(".line-img-content .line-img-item textarea[name='costInclude']").val(`${line.costInclude}`);
	$(".line-img-content .line-img-item textarea[name='costUnInclude']").val(`${line.costUnInclude}`);
	$(".line-img-content .line-img-item textarea[name='lineFeature']").val(`${line.lineFeature}`);
	$(".line-right .title-img").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath=" + line.lineImage+ "");
}


function showImages(line) {
	for(var i = 0; i < line.imageList.length; i++) {
        
		var liStr = "";
        var liStr = `<div class="traval">
                        <div class="line-item">
                            <div class="line-item-left">
                                <span>行程天数：</span>
                                <input type="text" name="day" value="${line.imageList[i].day}" />
                            </div>
                            <div class="line-item-left">
                                <span>行程目的：</span>
                                <input type="text" name="name" value="${line.imageList[i].name}" />
                            </div>
                            <div class="line-item-left">
                                <span>住宿地点：</span>
                                <input type="text" name="stay" value="${line.imageList[i].stay}" />
                            </div>
                            <div class="line-item-left">
                                <span>套餐类型：</span>
                                <input type="text" name="meal" value="${line.imageList[i].meal}" />
                            </div>
                            <div class="line-item-left">
                                <span>交通工具：</span>
                                <input type="text" name="trafic" value="${line.imageList[i].trafic}" />
                            </div>
                        </div>
                        <div class="line-item">
                            <span class="textarea-title">行程详情：</span>
                            <textarea name="detail" rows="8" cols="110">${line.imageList[i].detail}</textarea>
                        </div>
                    </div>
                    <hr />`
    
        $(".line-images-ul").append(liStr);
	}
}


function resetLine() {
	$(".personal-data input").attr("disabled","disabled");
	$(".personal-data textarea").attr("disabled","disabled");
}
