
/**
* 设置cookie过期时间
**/


function setCookie(name, value) {
    var str = name + "=" + escape(value);
    var date = new Date();
    date.setTime(date.getTime() + 6 * 60 * 60 * 1000); //设置过期时间为6小时
    str += ";expires=" + date.toGMTString()+ ";path=/";
    document.cookie = str;
}

/**
* 获取cookie
**/
function getCookie(name){    
   var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对    
   var cookie=new Object();    
   for (var i=0;i<cookieArray.length;i++){    
      var arr=cookieArray[i].split("=");       //将名和值分开    
      if(arr[0]==name)return unescape(arr[1]); //如果是指定的cookie，则返回它的值    
   } 
   return ""; 
} 


function getQueryString(name)   //获取正则表达式地址栏的id值，获取网址上的参数
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


/**
* 删除cookie
**/
function delCookie(name)
{
   document.cookie = name+"=;expires="+(new Date(0)).toGMTString()+ ";path=/";
}

/**
* 页面加载完成时
*/
$(function(){
    
});
