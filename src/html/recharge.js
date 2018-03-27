
$(function () {
  init();
});

var rchData = {
  rchMoney:4998,//充值金额
  rchType:1,//充值方式
};

function init() {
  renderPage();
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
  selMoneyAmt();
}

//金额数量选择
function selMoneyAmt(){
  $("#moneySelBox .item").click(function () {
    var num = $(this).html();
    $(this).addClass('active').siblings('.item').removeClass('active');
    $("#rchMoney").val(num);
    rchData.rchMoney = num;
  });
}

function resetForm(){

};

//提交数据
function subData() {
  var rchMoney = $('#rchMoney').val();
  if(!rchMoney){
    showTips('请输入充值金额')
  }else{
    showTips('页面跳转中,请稍等...');
  }
}

function renderPage(){
  resetForm();
  getUserInfo();
}

function getUserInfo() {
  ajaxHelper.get(getUrl('tran/acct/get'),null,function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      var obj = res.obj;
      $("#showMoney").html((obj.balance).toFixed(2));//账户余额
    }
  })
};
