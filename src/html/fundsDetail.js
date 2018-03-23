
$(function () {
  init();
});

var listType = 1;//全部 1  2  3 全部 充值 提现
var isLoading = false;

function init() {
  //列表切换
  $(".tableHeader .item").click(function () {
    $(this).addClass('active').siblings('.item').removeClass('active');
    var _index = $(this).index();
    listType = _index+1;
    $('.tableBody .bodyWrap').eq(_index).addClass('active').siblings('.bodyWrap').removeClass('active');
  })
  //到达底部
  $(window).scroll(function () {
    if(isBot()){
      console.log(1);
    }else{
      console.log(2);
    }
  })
}

