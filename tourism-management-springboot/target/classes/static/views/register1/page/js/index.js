
$(function(){
     //注册
     $('.now-reg-btn').click(function(){
        var regfrm = $("#regfrm").val();
         $('#'+regfrm).submit()
     })
     //验证码刷新
     $('.reg-change').click(function(){
         $(this).parents('li').first().find('img').trigger('click');
     })
     
     
     /*手机注册验证开始*/
     jQuery.validator.addMethod("mobile",function(value, element){
         var pattern=/^1+\d{10}$/;
         return pattern.test(value);
     },"请输入正确的手机号");
     $("#phonefrm").validate({
         rules: {
             'mobile': {
                 required: true,
                 mobile: true,
                 remote: {
                     url: SITEURL+'member/register/ajax_reg_checkmobile',
                     type: 'post'
                 }
             },
             'password1': {
                 required: true,
                 minlength: 6
             },
             'password2': {
                 required: true,
                 equalTo: '#password1'
             },
             'p_checkcode': {
                 required: true,
                 remote:{
                     url: SITEURL+'pub/ajax_check_code',
                     type:'post',
                     data:{
                         checkcode:function(){
                             return $("#p_checkcode").val();
                         }
                     }
                 }
             },
             'msgcode':{
                 required:true,
                 remote:{
                     url: SITEURL+'member/register/ajax_check_msgcode',
                     type: 'post',
                     data: {
                         mobile: function() {
                             return $( "#mobile" ).val();
                         }
                     }
                 }
             }
         },
         messages: {
             'mobile':{
                 required:'手机号不能为空',
                 remote:'该手机号已被注册,您可以<a href="/member/login">直接登陆</a>'
             },
             'password1':{
                 required:'密码不能为空',
                 minlength:'密码不得小于6位'
             },
             'password2':{
                 required:'密码前后不一致',
                 equalTo:'密码前后不一致'
             },
             'p_checkcode':{
                 required:'验证码不能为空',
                 remote:'验证码错误'
             },
             'msgcode':{
                 required:'验证码不能为空',
                 remote:'验证码错误'
             }
         },
         errorPlacement: function (error, element) {
             $(element).parents('li:first').find('.msg_contain').html(error);
             $(element).parents('li:first').find('.msg_contain').addClass('reg-error-txt').removeClass('reg-pass-ico');
         },
         success: function (msg, element) {
             $(element).parents('li:first').find('.msg_contain').html('');
             $(element).parents('li:first').find('.msg_contain').addClass('reg-pass-ico').removeClass('reg-error-txt');
             if($(element).is('#password1')){
                 set_pwd_safe('#phonefrm','#password1');
             }
         },
         onkeyup:function(element,event)
         {
             set_pwd_safe('#phoneform','#p_password');
             $(element).valid();
         },
         submitHandler: function (form) {
             var frmdata = $("#phonefrm").serialize();
             $.ajax({
                 type:'POST',
                 url:SITEURL+'member/register/ajax_doreg',
                 data:frmdata,
                 dataType:'json',
                 success:function(data){
                     if(data.status){
                         var url = $("#backurl").val();
                         $('body').append(data.js);//同步登陆js
                         layer.msg(data.msg, {
                             icon: 6,
                             time: 1000
                         })
                         setTimeout(function(){window.open(url,'_self');},500);
                     }else{
                         layer.msg(data.msg, {
                             icon: 5,
                             time: 1000
                         })
                     }
                 }
             })
         }
     });
     //邮箱注册验证
     $("#emailfrm").validate({
         rules: {
             'email': {
                 required: true,
                 email: true,
                 remote: {
                     url: SITEURL+'member/register/ajax_check_email',
                     type: 'post'
                 }
             },
             'e_password1': {
                 required: true,
                 minlength: 6
             },
             'e_password2': {
                 required: true,
                 equalTo: '#e_password1'
             },
             'e_checkcode':{
                 required: true,
                 remote:{
                     url: SITEURL+'pub/ajax_check_code',
                     type:'post',
                     data:{
                         checkcode:function(){
                             return $("#e_checkcode").val();
                         }
                     }
                 }
             },
             e_email_code:{
                 required:true,
                 remote:{
                     url: SITEURL+'member/register/ajax_check_email_code',
                     type: 'post',
                     data: {
                         email: function() {
                             return $("#email" ).val();
                         }
                     }
                 }
             }
         },
         messages: {
             'email':{
                 required:'邮箱不能为空',
                 email:'邮箱格式错误',
                 remote:'该邮箱已经被注册,您可以<a href="/member/login">直接登陆</a>'
             },
             'e_password1':{
                 required:'密码不能为空',
                 minlength:'密码不得小于6位'
             },
             'e_password2':{
                 required:'密码前后不一致',
                 equalTo:'密码前后不一致'
             },
             'e_email_code':{
                 required:'邮箱验证码不能为空',
                 remote:'验证码错误'
             },
             'e_checkcode':{
                 required:'验证码不能为空',
                 remote:'验证码错误'
             }
         },
         errorPlacement: function (error, element) {
             $(element).parents('li:first').find('.msg_contain').html(error);
             $(element).parents('li:first').find('.msg_contain').addClass('reg-error-txt').removeClass('reg-pass-ico');
         },
         success: function (msg, element) {
             $(element).parents('li:first').find('.msg_contain').html('');
             $(element).parents('li:first').find('.msg_contain').addClass('reg-pass-ico').removeClass('reg-error-txt');
             if($(element).is('#e_password1')){
                 set_pwd_safe('#emailfrm','#e_password1');
             }
         },
         onkeyup:function(element,event)
         {
             set_pwd_safe('#emailfrm','#e_password1');
             $(element).valid();
         }
         ,
         submitHandler: function (form) {
             var frmdata = $("#emailfrm").serialize();
             $.ajax({
                 type:'POST',
                 url:SITEURL+'member/register/ajax_doreg',
                 data:frmdata,
                 dataType:'json',
                 success:function(data){
                     if(data.status){
                         var url = $("#backurl").val();
                         $('body').append(data.js);//同步登陆js
                         layer.msg(data.msg, {
                             icon: 6,
                             time: 1000
                         })
                         setTimeout(function(){window.open(url,'_self');},500);
                     }else{
                         layer.msg(data.msg, {
                             icon: 5,
                             time: 1000
                         })
                     }
                 }
             })
         }
     });
})

//密码强度
function set_pwd_safe(pselector,selector){
     var pwd=$(pselector+' '+selector).val();
     var pattern_1=/^[0-9]*$/i;
     var pattern_2=/[a-z0-9]+/i;
     var obj = $(pselector).find('.complex_contain');
     var html = '';
     //弱
     if(pattern_1.test(pwd)&&pwd.length<8)
     {
         html = "<span class='reg-pw-intensity ruo'>弱</span>";
         obj.html(html);
         return false;
     }
     //中
     if(pattern_1.test(pwd)&&pwd.length>=8)
     {
         html = "<span class='reg-pw-intensity zhong'>中</span>";
         obj.html(html);
         return false;
     }
     //高
     if(pattern_2.test(pwd)&&pwd.length>=8)
     {
         html = "<span class='reg-pw-intensity gao'>高</span>";
         obj.html(html);
         return false;
     }
}
//短信发送倒计时
function code_timeout(v){
     if(v>0)
     {
         $('.sendmsg').val((--v)+'秒后重发');
         setTimeout(function(){
             code_timeout(v)
         },1000);
     }
     else
     {
         $('.sendmsg').val('重发验证码');
         $('.sendmsg').disabled = false;
     }
}
//邮箱发送倒计时
function email_code_timeout(v){
    if(v>0)
    {
        $('.sendemail').val((--v)+'秒后重发');
        setTimeout(function(){
            email_code_timeout(v)
        },1000);
    }
    else
    {
        $('.sendemail').val('重发验证码');
        $('.sendemail').disabled = false;
    }
}
