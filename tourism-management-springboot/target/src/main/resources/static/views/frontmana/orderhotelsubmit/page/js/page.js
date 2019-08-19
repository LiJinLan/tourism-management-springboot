$('document').ready(function(){
    //鍒濆鍖�
    if($('.payment-line').find('li.active')){
        $('#st-payment-submit').removeClass('error');
    }
    //閫夋嫨鏀粯鏂瑰紡
    $('.payment-line').find('li').click(function(){
        $('.payment-line').find('li').removeClass('active');
        $(this).addClass('active');
        $('#st-payment-submit').removeClass('error');
    });
    $('#st-payment-submit').click(function(){
        var selectedLi=$('.payment-line').find('li.active');
        var len=selectedLi.length;
        if(len!=1){
            return;
        }
        param.method=selectedLi.attr('data');
        $url=new Array();
        for(key in param){
            $url.push(key+'='+param[key]);
        }
        $('#st-payment-back-box').css('display','block');
        window.open("/payment/index/confirm?"+$url.join('&'));
    });
    //鏀粯澶辫触
    $('#st-payment-back-error').click(function(){
        $('#st-payment-back-box').css('display','none');
    });
    //鏀粯鎴愬姛
    /*$('#st-payment-back-success').click(function(){
        $.post('/payment/index/ajax_ispay',param,function(url){
            if(url!=0){
                  window.location.href=url;
            }else{
                $('#st-payment-back-box').css('display','none');
            }
        })
    });*/

});
