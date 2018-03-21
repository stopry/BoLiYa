

$(function () {
  init();
});



function init() {
  $(".eyes").click(function () {
    $(this).toggleClass('active');
  });
  $(".registBtn").click(function () {
    showTips('请输入手机号');
  })
}
