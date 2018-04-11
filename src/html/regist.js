
$(function () {
  init();
});

var registData = {
  mobile:'',
  wxAct:'',
  password:'',
  prtCode:'',
  verCode:''
};

function toggleLicense(bool) {
  if(bool){
    showLayerBlack(1);
    $(".tipsAlert").show();
  }else{
    showLayerBlack(!1);
    $(".tipsAlert").hide();
  }
}


function init() {
  objVerticalCenter('.tipsAlert');
  var timer = 90;
  var interVal = null;
  $('#getVerCode').click(function () {
    getVerCode();
  });

  //获取验证码
  function getVerCode() {
    var mobile = $.trim($('#mobile').val());
    if(!mobile){
      showTips('请输入手机号');
      return;
    }else if(!validate.checkMobile(mobile)){
      showTips('手机号格式有误');
      return;
    }
    if(!canGetVcode){
      showTips('请稍后再试');
      return;
    }
    ajaxHelper.get(getUrl('sms/sendRegSms'),{"mobile":mobile},function(res){
      if(!res.success){
        showTips(res.msg)
      }else {
        vCodeCount("#getVerCode",interVal,timer);
        showTips('验证码发送成功');
      }
    })
  }
}

function resetForm(){
  $('#mobile').val('');
  $('#wxAct').val('');
  $('#password').val('');
  $('#prtCode').val('');
  $('#verCode').val('');
};

//提交数据
function subData() {
  var mobile = $.trim($('#mobile').val());
  var wxAct = $.trim($('#wxAct').val());
  var password = $.trim($('#password').val());
  var prtCode = $.trim($('#prtCode').val());
  var verCode = $.trim($('#verCode').val());
  if(!mobile){
    showTips('请输入手机号');
    return;
  }else if(!wxAct){
    showTips('请输入微信号');
    return;
  }else if(!password){
    showTips('请输入登录密码');
    return;
  }else if(!verCode){
    showTips('请输短信验证码');
    return;
  }else if(!prtCode){
    showTips('请输入推荐码');
  }else if(!validate.checkMobile(mobile)){
    showTips('请输入正确的手机号码');
    return;
  }
  registData.mobile = mobile;
  registData.wxAct = wxAct;
  registData.password = password;
  registData.prtCode = prtCode;
  registData.verCode = verCode;

  var subData = {
    "mobile": registData.mobile,
    "nickname": registData.wxAct,
    "pwd": registData.password,
    "tjCode": registData.prtCode,
    "vcode": registData.verCode
  };

  ajaxHelper.post(getUrl('oauth/regist'),subData,function (res) {
    console.log(res);
    if(res.success){
      showTips('注册成功','success');
      resetForm();
      setTimeout(function () {
        openLocal('/logIn.html');
      },2000);
    }else{
      showTips(res.msg);
    }
  })
}

