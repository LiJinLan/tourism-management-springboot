var lineId = getQueryString("id");
$(function() {
    loadLine();
})

function loadLine() {
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
            }else{
                alert(data.error);
          }
        },
        error : function(xhr, text, error) {
          alert("通过id查询线路错误");
        }
    });  
}

function showLine(line) {
	$(".line .line-item input[name='linename']").val(`${line.name}`);
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
    $(".line .line-left .line-item input[name='address']").val(`${line.address}`);
    $(".line .line-item textarea[name='ContractPay']").val(`${line.ContractPay}`);
    $(".line-img-content .line-img-item textarea[name='remark']").val(`${line.remark}`);
    $(".line-img-content .line-img-item textarea[name='costInclude']").val(`${line.costInclude}`);
	$(".line-img-content .line-img-item textarea[name='costUnInclude']").val(`${line.costUnInclude}`);
	$(".line-img-content .line-img-item textarea[name='lineFeature']").val(`${line.lineFeature}`);
	$(".line-right .title-img").attr("src","http://127.0.0.1:8086/file/downloadFile?filePath=" + line.lineImage+ "").attr("filepath",line.lineImage);
}

function updateMainImg() {
    var $imgRight = $(".line .line-right");
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

function showImages(line) {
    $(".line-images-ul").html("");
	for(var i = 0; i < line.imageList.length; i++) {
		var liStr = "";
        var liStr = `<div class="traval" scheduleid=${line.imageList[i].id} >
                        <div class="line-item">
                            <div class="line-item-left">
                                <span>第</span>
                                <input type="text" name="day" value=${line.imageList[i].day} />
                                <span>天</span>
                            </div>
                            <div class="line-item-left">
                                <span>行程目的：</span>
                                <input type="text" name="name" value=${line.imageList[i].name} />
                            </div>
                            <div class="line-item-left">
                                <span>住宿地点：</span>
                                <input type="text" name="stay" value=${line.imageList[i].stay} />
                            </div>
                            <div class="line-item-left">
                                <span>套餐类型：</span>
                                <input type="text" name="meal" value=${line.imageList[i].meal} />
                            </div>
                            <div class="line-item-left">
                                <span>交通工具：</span>
                                <input type="text" name="trafic" value=${line.imageList[i].trafic} />
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

function lineModify() {
    var lineName = $(".line .line-item input[name='linename']").val();
    var mealSign = $(".line .line-item input[name='mealSign']").val();
    var lineNumber = $(".line .line-item input[name='lineNumber']").val();
    var gobackWay = $(".line .line-item input[name='gobackWay']").val();
    var satisfaction = $(".line .line-item input[name='satisfaction']").val();
    var aheadApply = $(".line .line-item input[name='aheadApply']").val();
    var originalPrice = $(".line .line-item input[name='originalPrice']").val();
    var salePrice = $(".line .line-item input[name='salePrice']").val();
    var payWay = $(".line .line-item input[name='payWay']").val();
    var telephone = $(".line .line-item input[name='telephone']").val();
    var tradeVolume = $(".line .line-item input[name='tradeVolume']").val();
    var address = $(".line .line-left .line-item input[name='address']").val()
    var ContractPay = $(".line .line-item textarea[name='ContractPay']").val();
    var remark = $(".line-img-content .line-img-item textarea[name='remark']").val();
    var costInclude = $(".line-img-content .line-img-item textarea[name='costInclude']").val();
    var costUnInclude = $(".line-img-content .line-img-item textarea[name='costUnInclude']").val();
    var lineFeature = $(".line-img-content .line-img-item textarea[name='lineFeature']").val();
    var lineImage = $(".line .line-right img").attr("filepath");

    var schedule = []; 
    var lineSchedule = $(".line-images-ul .traval");
    for(var i = 0 ; i < lineSchedule.length; i++) {
        var scheduleId = $(lineSchedule[i]).attr("scheduleid");
        var name = $(lineSchedule[i]).find("input[name='name']").val();
        var day = $(lineSchedule[i]).find("input[name='day']").val();
        var stay = $(lineSchedule[i]).find("input[name='stay']").val();
        var meal = $(lineSchedule[i]).find("input[name='meal']").val();
        var trafic = $(lineSchedule[i]).find("input[name='trafic']").val();
        var detail = $(lineSchedule[i]).find("textarea[name='detail']").val();
        schedule.push({
            id: scheduleId,
            name: name,
            day: day,
            stay: stay,
            meal: meal,
            trafic: trafic,
            detail: detail
        })
    }


    var lineData = {
        line: {
            "id": lineId,
            "name": lineName,
            "mealSign": mealSign,
            "lineNumber": lineNumber,
            "gobackWay": gobackWay,
            "satisfaction": satisfaction,
            "aheadApply": aheadApply,
            "originalPrice": originalPrice,
            "salePrice": salePrice,
            "payWay": payWay,
            "tradeVolume": tradeVolume,
            "telephone": telephone,
            "ContractPay": ContractPay,
            "remark": remark,
            "costInclude": costInclude,
            "costUnInclude": costUnInclude,
            "lineFeature": lineFeature,
            "lineImage": lineImage,
            "address": address,
        },
        schedule: schedule
    };

    if(lineName.length == 0) {
        alert("线路名称不能为空");
        return false;
    }

    $.ajax({
        url: "http://127.0.0.1:8086/line/updateLine",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(lineData),
        dataType: "json",
        success: function successCallBack(data) {
            if(data.success==true){
                loadLine();
                pnotify("成功", "修改线路成功", "success");
            }
        },
        error: function errorCallBack(xhr) {
            pnotify("失败", "修改线路失败", "error");
        }
    });
}


