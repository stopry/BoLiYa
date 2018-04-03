

$(function () {
  init();
});

function init() {
  $(".eyes").click(function () {
    $(this).toggleClass('active');
    var isHide = $(this).hasClass('active');
    if(!isHide){
      $(".showMoney").hide();
      $(".hideMoney").show();
    }else{
      $(".showMoney").show();
      $(".hideMoney").hide();
    }
  });
  $(".registBtn").click(function () {
    showTips('请输入手机号');
  });
  getUserInfo();
}

function getUserInfo() {
  ajaxHelper.get(getUrl('tran/acct/get'),null,function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      var obj = res.obj;
      $("#userImg").attr('src',obj.hearimgUrl);
      $("#all_money").html((obj.balance).toFixed(2));
      $("#keyong").html((obj.usableDeposit).toFixed(2));//可用保证金
      $("#zhanyong").html((obj.useDeposit).toFixed(2));//占用保证金
    }
  })
};

//推出登录
function exitLogIn() {
  layer.confirm('确认退出登录吗', {
    btn: ['确认'] //按钮
  }, function () {
    oauth.clean();
    openLocal('/html/login.html');
  });
}
