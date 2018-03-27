

$(function () {
  init();
});


var logInData = {
  mobile:'',
  password:''
};
function init() {

}

//提交数据
function subData() {
  var mobile = $.trim($('#mobile').val());
  var password = $.trim($('#password').val());
  if(!mobile){
    showTips('请输入手机号')
  }else if(!password){
    showTips('请输入登录密码')
  }else if(!validate.checkMobile(mobile)){
    showTips('请输入正确的手机号码')
  }
  logInData.mobile = mobile;
  logInData.password = password;
  var subData = {
    "captchaCode": " ",
    "captchaValue": " ",
    "clientId": "098f6bcd4621d373cade4e832627b4f6",
    "login_channel": " ",
    "password": logInData.password,
    "userName": logInData.mobile
  };
  ajaxHelper.post(getUrl('oauth/token'),subData,function (res) {
    console.log(res);
    if(res.success){
      if (typeof localStorage === 'object') {
        try {
          localStorage.setItem('localStorage', 1);
          localStorage.removeItem('localStorage');
        } catch (e) {
          Storage.prototype._setItem = Storage.prototype.setItem;
          Storage.prototype.setItem = function() {};
          showTips('请关闭无痕浏览模式后重试','error');
          alert('请关闭无痕浏览模式后重试');
          return;
        }
      }
      showTips('登陆成功','success');
      oauth.setToken(res.obj.accessToken);
      setTimeout(function () {
        openLocal('/index.html');
      },2000);
    }else{
      showTips(res.msg);
    }
  })
}
