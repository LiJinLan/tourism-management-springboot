function getId(){
	var timestamp=new Date().getTime();

	/*var timetemp = Date.parse(new Date()).toString(); // 结果：1280977332000,最后三位为毫秒的显示，需求精确到秒
	var timestamp = timetemp.substring(0, timetemp.length - 3); // 精确到秒的时间戳*/
	return timestamp;
}

function getTeamId(){
	var mydate = new Date();
	var str = "" + mydate.getFullYear();
	var mon = mydate.getMonth()+1;
	str += addZero(mon);
	var day = mydate.getDate() ;
	str += addZero(day);
	
	var timetemp = Date.parse(new Date()).toString(); // 结果：1280977332000,最后三位为毫秒的显示，需求精确到秒
	var timestamp = timetemp.substring(0, timetemp.length - 3); // 精确到秒的时间戳
	var temp = timestamp.substr(5,4);
	str += temp;
	
	//这样的订单如果短时间还是不会变的，所以再加上一个三位的随机数
	str += rd(100,999);
	return str;
}

function addZero(data){
	var str = "";
	if(data < 10){
		str = '0' + data;
	}else{
		str = '' + data;
	}
	return str;
}

//JS获取n至m随机整数
function rd(n,m){
    var c = m-n+1;  
    return Math.floor(Math.random() * c + n);
}

//js获取当前日期的下一天
function getNextDate(AddDayCount){
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;//获取当前月份的日期 
	var d = dd.getDate(); 
	
	if(m<10){
		m = "0" + m;
	}
	if(d< 10){
		d = "0" + d;
	}
	
	return y+"-"+m+"-"+d; 
}

