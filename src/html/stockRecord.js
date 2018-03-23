
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
    $('.tableBody .bodyWrap').eq(_index).addClass('active').siblings('.bodyWrap').removeClass('active');
  })
  toggle();

  //到达底部
  $(window).scroll(function () {
    if(isBot()){
      console.log(1);
    }else{
      console.log(2);
    }
  })
}

//时间信息的展开关闭
function toggle() {
  $(document).on('click','.openBtn',function () {
    $(this).toggleClass('close');
    var isOpen = $(this).hasClass('close');
    if(!isOpen){
      $(this).find('.icon-xia').show();
      $(this).find('.icon-shang').hide();
    }else{
      $(this).find('.icon-shang').show();
      $(this).find('.icon-xia').hide();
    }
    $(this).parent('.top').siblings('.verObj').find('.dateInfo').toggle();
  })
}
