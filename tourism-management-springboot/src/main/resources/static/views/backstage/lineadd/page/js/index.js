/*var scheduleIds = [];*/   //线路所关联的行程天数数组
var lineImage = "";
function addLine() {
	var name = $(".line .line-item input[name='name']").val();
	var mealSign = $('.line .line-item input[type="radio"]:checked').val();
	var lineNumber = $(".line .line-item input[name='lineNumber']").val();
	var gobackWay = $(".line .line-item input[name='gobackWay']").val();
	var satisfaction = $(".line .line-item input[name='satisfaction']").val();
	var aheadApply = $(".line .line-item select[name='aheadApply'] option:selected").val();
	var originalPrice = $(".line .line-item input[name='originalPrice']").val();
	var salePrice = $(".line .line-item input[name='salePrice']").val();
	var payWay = $(".line .line-item input[name='payWay']").val();
	var tradeVolume = $(".line .line-item input[name='tradeVolume']").val();
	var telephone = $(".line .line-item input[name='telephone']").val();
	var ContractPay = $(".line .line-item-text textarea[name='ContractPay']").val();
	var remark = $(".line .line-item-text textarea[name='remark']").val();
	var costInclude = $(".line .line-item-text textarea[name='costInclude']").val();
	var costUnInclude = $(".line .line-item-text textarea[name='costUnInclude']").val();
	var lineFeature = $(".line .line-item-text textarea[name='lineFeature']").val();
	var address = $(".line .line-left .line-item input[name='address']").val();
	var lineDays = "" + $(".line-img-content .traval").length + "";


	var lineData = {
		"name": name,
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
		"address" : address,
		"lineDays" :lineDays
	};
	if(name.length == 0) {
		alert("线路名称不能为空");
		return false;
	}

	//行程数据
	var scheduleData = [];
	var $schedule = $(".line-img-content .traval");
	for(var j = 0; j<$schedule.length; j++) {
		var day = $($schedule[j]).find("input[name='day']").val();
		var name = $($schedule[j]).find("input[name='name']").val();
		var meal = $($schedule[j]).find("select[name='meal'] option:selected").val();
		var stay = $($schedule[j]).find("input[name='stay']").val();
		var trafic = $($schedule[j]).find("input[name='trafic']").val();
		var detail = $($schedule[j]).find("textarea[name='detail']").val();
		
		var tempSchedule = {
			day: day,
			name: name,
			meal: meal,
			stay: stay,
			trafic: trafic,
			detail: detail
		}
		scheduleData.push(tempSchedule);
	}

	var reqData = {
		line: lineData,
		schedule: scheduleData
	}

	$.ajax({
	    url: "http://127.0.0.1:8086/line/addLine",
	    type: "POST",
	    contentType: "application/json;charset=utf-8",
	    data: JSON.stringify(reqData),
	    dataType: "json",
	    success: function successCallBack(data) {
	    	$(".add-line-btn").attr("disabled","disabled");
	    	if(data.success==true){
	    		pnotify("成功", "新增线路成功", "success");
	    	} 
	    	resetLine();	//添加线路成功后，把页面信息清空
	    },
	    error: function errorCallBack(xhr) {
	    	pnotify("失败", "新增线路失败", "error");
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
        	$(".line-submit-control button").removeAttr("disabled");
        	for(var i= 0; i< data.data.length; i++){
        		lineImage = ""+data["data"][i]["filePath"];
        	}
        	$(".line-right").each(function(index,item){
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


//添加行程天数
function addLineDay() {
	var $schedule = $(".line-img-content .traval");
	var liStr = `<div class="traval">
                            <div class="line-left-to">
                            	<div class="line-item">
                            	    <div class="line-item-left">
                            	        <span>第&nbsp;&nbsp;&nbsp;${($schedule.length + 1)}&nbsp;&nbsp;天：</span>
                            	        <input type="text" name="day" value="${($schedule.length + 1)}"/>
                            	    </div>
                            	    <div class="line-item-right">
                            	        <span>行程目的：</span>
                            	        <input type="text" name="name" />
                            	    </div>
                            	</div>
                                <div class="line-item">
	                                <div class="line-item-left">
	                                    <span>住宿地点：</span>
	                                    <input type="text" name="stay" />
	                                </div>
                                    <div class="line-item-right">
                                        <span>套餐类型：</span>
                                        <select name="meal" class="grade">
                                            <option value="一日三餐">一日三餐</option>
                                            <option value="中晚餐">中晚餐</option>
                                            <option value="早晚餐">早晚餐</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="line-item">
                                    <div class="line-item-left">
                                        <span>交通工具：</span>
                                        <input type="text" name="trafic" />
                                    </div>
                                </div>
                            </div>
                            <div class="line-right-to">
                                <span class="textarea">行程详情：</span>
                                <textarea name="detail" rows="5" cols="40"></textarea>
                            </div>
                        </div>`
	$(".line-images-control").append(liStr);

}


//添加线路成功后，把页面信息清空
function resetLine() {
	$(".line .line-item input[name='name']").val('');
	$('.line .line-item input[type="radio"]:checked').val('');
	$(".line .line-item input[name='lineNumber']").val('');
	$(".line .line-item input[name='gobackWay']").val('');
	$(".line .line-item input[name='satisfaction']").val('');
	$(".line .line-item select[name='aheadApply'] option:selected").val('');
	$(".line .line-item input[name='originalPrice']").val('');
	$(".line .line-item input[name='salePrice']").val('');
	$(".line .line-item input[name='payWay']").val('');
	$(".line .line-item input[name='tradeVolume']").val('');
	$(".line .line-item input[name='telephone']").val('');
	$(".line .line-left .line-item input[name='address']").val('');
	$(".line .line-item-text textarea[name='ContractPay']").val('');
	$(".line .line-item-text textarea[name='remark']").val('');
	$(".line .line-item-text textarea[name='costInclude']").val('');
	$(".line .line-item-text textarea[name='costUnInclude']").val('');
	$(".line .line-item-text textarea[name='lineFeature']").val('');
	$(".line-img-content .traval").html("");
	$(".upload-image-btn").attr("disabled","disabled");
	$(".line-submit-control button").attr("disabled","disabled");
	$(".line-right .title-image").val("").show();
	$(".line-right button").show();
	$(".line-right img").attr("src","").hide();
}
