
$(function () {
  init();
});

function init() {

  var listType = 1;//全部 1  2  3 全部 充值 提现
  var isLoading = false;
  var pageNum = 1;

  //列表切换
  $(".tableHeader .item").click(function () {
    $(this).addClass('active').siblings('.item').removeClass('active');
    var _index = $(this).index();
    listType = _index+1;
    $('.tableBody .bodyWrap').eq(_index).addClass('active').siblings('.bodyWrap').removeClass('active');
  });
  getData();//默认加载第一页
  //到达底部
  $(window).scroll(function () {
    if(isBot()){
      if(isLoading) return;
      getData();
    }else{
      console.log(2);
    }
  })
  //获取数据
  function getData() {
    // console.log(pageNum);
    isLoading = true;
    //模拟加载数据
    ajaxHelper.get(getUrl('tran/getDepositWithdrawList'),{pageNum:pageNum},function (res) {
      // if(!res.success){
      //   showTips(res.msg);
      // }else{
        var list = res.obj;
        // if(list&&list.length){
          var html = ''
          for(var i = 0;i<10;i++){
            html += '<div class="item borderBot cash">'+
              '<div class="type">'+

              '</div>'+
              '<div class="main">'+
              '<p class="tle">快捷支付充值</p>'+
              '<p class="fee">手续费：<span>0.00</span></p>'+
            '<p class="order">订单号：<span>201845120124</span></p>'+
            '<p class="date">日<i style="opacity: 0">0</i> 期：<span>2018-01-12-05 03：12：10</span></p>'+
            '</div>'+
            '<div class="rightInfo">'+
              '<div class="money">'+
              '+10000'+
              '</div>'+
              '<div class="status">'+
              '成功'+
              '</div>'+
              '</div>'+
              '</div>'
          }
          $('.tableBody .bodyWrap').append(html);
          pageNum++;
          isLoading = false;
        // }
      // }
    })
  }
}

