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
                lineTitle(line);
                lineDay(line);
                eachDay(line);
                lineDetail(line);
            }else{
                alert(data.error);
            }
        },
        error : function(xhr, text, error) {
            alert(data.error);
        }
    });
})

function lineTitle(line) {
    var scenicStr = "";
    scenicStr +=   `<div class="jg">
                        <span>优惠价：${line.salePrice}元/人</span>
                    </div>
                    <div class="sl">
                        <span>销量：${line.tradeVolume}</span><s>|</s><span>满意度：${line.satisfaction}</span>
                    </div>
                    <dl class="tc">
                        <dt>套餐类型：</dt>
                        <dd class="type suitlist">
                            <a href="javascript:;" data-suitid="4" data-jifentprice="1" data-jifenbook="10">${line.mealSign}</a>
                        </dd>
                        <dd class="yd-btn">
                            <a href="../../lineorder/page/index.html?id=${line.id}">立即预订</a>
                        </dd>
                    </dl>
                    <ul class="msg-ul">
                        <li><em>线路编号：</em><p>${line.lineNumber}</p></li>
                        <li><em>积分优惠：</em><p><span class="fan jifentprice"><i></i></span><span class="song jifenbook"><i></i></span></p></li>
                        <li><em>往返交通：</em><p>${line.gobackWay}</p></li>
                        <li><em>提前报名：</em><p>${line.aheadApply}</p></li>
                        <li><em>付款方式：</em><p>${line.payWay}</p> </li>
                    </ul>`
    $(".focus-slide .imgnav").append(`<img src="http://127.0.0.1:8086/file/downloadFile?filePath=${line.lineImage}" width="460" height="391"/>`)
    $(".cp-show-msg").append(scenicStr);
    var titleStr = "";
    titleStr += `<a href="/line/print/id/1" class="print-btn">打印行程</a>
                <h1>${line.name}<img src="../uploads/2015/icon/special.png" /></h1>
                <p>精品纯玩游，热门特价线路</p>`
    $(".lineshow-tw .lw-title").append(titleStr);
}  

function  lineDay(line) {
    for(var i = 0; i < line.imageList.length; i++) {
        var darStr = "";
        darStr += `<p>第&nbsp;&nbsp;${line.imageList[i].day}&nbsp;&nbsp;天：${line.imageList[i].name}</p>`
        $(".tabbox-list .day").append(darStr);
    }
    $(".tabbox-list .lineFeature").append(`<p>${line.lineFeature}</p>`);
}

function eachDay(line) {
    for(var i = 0; i < line.imageList.length; i++) {
        var eachDay = "";
        eachDay += `<div class="day-con part" id="day_c_1">
                        <div class="day-num">${line.imageList[i].day}</div>
                        <div class="day-tit">
                            <strong>第&nbsp;&nbsp;${line.imageList[i].day}&nbsp;&nbsp;天</strong>
                            <p>${line.imageList[i].name}</p>
                        </div>
                        <table class="day-tb" width="100%" border="0" bgcolor="#f9f8f8">
                            <tr>
                                <th width="110" scope="row">
                                    <span class="yc">用餐情况：</span>
                                </th>
                                <td>${line.imageList[i].meal}</td>
                            </tr>
                            <tr>
                                <th width="110" scope="row">
                                    <span class="zs">住宿情况：</span>
                                </th>
                                <td colspan="1">${line.imageList[i].stay}</td>
                            </tr>
                            <tr class="bor_0">
                                <th width="110" scope="row"><span class="gj">交通工具：</span></th>
                                <td colspan="1">${line.imageList[i].trafic}</td>
                            </tr>
                        </table>
                        <div class="txt">
                            <p>&nbsp;&nbsp;${line.imageList[i].detail}</p>
                            <p><br/></p>                        
                        </div>
                        <ul class="jd-lsit">

                        </ul>
                    </div>`
        $(".tabbox-list .eachday").append(eachDay);
        $(".day-leftnav .day-navlist").append(`<li><a href="#day_c_1" class="">DAY${line.imageList[i].day}</a></li>`)
    }
} 

function lineDetail(line) {
    $(".lineshow-con .costInclude").append(`<p>${line.costInclude}</p><p><br/></p>`);
    $(".lineshow-con .costUnInclude").append(`<p>${line.costUnInclude}</p><p><br/></p>`);
    $(".lineshow-con .ContractPay").append(`<p>${line.ContractPay}</p><p><br/></p>`);
    $(".lineshow-con .remark").append(`<p>${line.remark}</p><p><br/></p>`);
}
