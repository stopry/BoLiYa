
$(function () {
  init();
});

var resetData = {
  oldpwd:'',
  newpwd:'',
  newpwdT:'',
};

function init() {
  $("#confirm").click(function () {
    subData();
  })
}

function resetForm(){
  $('#oldpwd').val('');
  $('#newpwd').val('');
  $('#newpwdt').val('');
};

//提交数据
function subData() {
  var oldpwd = $.trim($('#oldpwd').val());
  var newpwd = $.trim($('#newpwd').val());
  var newpwdt = $.trim($('#newpwdt').val());
  resetData.oldpwd = oldpwd;
  resetData.newpwd = newpwd;
  resetData.newpwdt = newpwdt;
  if(!oldpwd){
    showTips('请输入旧密码');
  }else if(!newpwd){
    showTips('请输入旧密码');
  }else if(!newpwdt){
    showTips('请再次输入旧密码');
  }else if(newpwd!==newpwdt){
    showTips('两次新密码不一样');
  }else{
    ajaxHelper.post(getUrl('tran/security/updatePwd'),resetData,function (res) {
      if(res.success){
        oauth.clean();
        resetForm();
        showTips('修改成功','success');
        setTimeout(function () {
          openLocal('/html/logIn.html');
        },2000);
      }else{
        showTips(res.msg);
      }
    })
  }
}

