var type = "";
$(function() {
	$(".searchmodel").on("click","li",function(){
	    type = $(this).attr('data-url');
	    var typename = $(this).text();
	    $("#typename").html(typename+'<i></i>');
	})
})

function searchKey() {
    var keyWord = $(".st-top-search .searchkeyword").val();
	var reqData = {
		type: type,
		keyWord: keyWord
	}

	$.ajax({
		url: "http://127.0.0.1:8086/search/searchByKeyWord",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify(reqData),
		success: function successCallBack(data) {
			if(data.success==true && data.data != null){
				window.location.href = "http://127.0.0.1:8086/views/frontmana/searchkeyword/page/index.html?keyword="+keyWord+"&type="+type;
			}else{
				alert("失败");
			}
		},
		error : function(xhr, text, error) {
			alert("失败");
		}
	});
}
