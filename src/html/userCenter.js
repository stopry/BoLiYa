

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
  })
}

function getUserInfo() {

};
