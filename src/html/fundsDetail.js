
$(function () {
  init();
});

function init() {
  //列表切换
  $(".tableHeader .item").click(function () {
    $(this).addClass('active').siblings('.item').removeClass('active');
    var _index = $(this).index();
    $('.tableBody .bodyWrap').eq(_index).addClass('active').siblings('.bodyWrap').removeClass('active');
  })
}

