
$(function () {
  init();
});

var rchData = {
  rchMoney:4998,//充值金额
  rchType:1,//充值方式
};

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
}

//金额数量选择
function selMoneyAmt(){
  $("#moneySelBox .item").click(function () {
    var num = $(this).html();
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

  }
}

function renderPage(){

}
