
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
  // 数据没做分页 暂时取消下拉分页
  $(window).scroll(function () {
    if(isBot()){
      if(isLoading) return;
      getData();
    }else{
      console.log(2);
    }
  });
  //获取数据
  function getData() {
    // console.log(pageNum);
    isLoading = true;
    //模拟加载数据
    ajaxHelper.get(getUrl('tran/getDepositWithdrawList'),{pageNum:pageNum},function (res) {
      if(!res.success){
        showTips(res.msg);
      }else{
        var list = res.obj;
        if(list&&list.length){
          var html = ''
          for(var i = 0;i<list.length;i++){
            var item = list[i];
            var _class = item.tranType==1?'cash':'rch';
            var _money = (item.tranType==1?'+':'-')+item.initialBalance;
            var date = new Date(item.createTime).Format('yyyy/MM/dd hh:mm:ss');
            var _status = item.status==1?'成功':'失败';
            var _title = item.remark?item.remark:"银行卡提现";
            html +=  '<div class="item borderBot '+_class+'">'+
              '<div class="type">'+

              '</div>'+
              '<div class="main">'+
              '<p class="tle">'+_title+'</p>'+
              '<p class="fee">手续费：<span>'+(item.charge).toFixed(2)+'</span></p>'+
            '<p class="order">订单号：<span>'+item.orderId+'</span></p>'+
            '<p class="date">日<i style="opacity: 0">空</i> 期：<span>'+date+'</span></p>'+
            '</div>'+
            '<div class="rightInfo">'+
              '<div class="money">'+
              _money+
              '</div>'+
              '<div class="status">'+
              _status+
              '</div>'+
              '</div>'+
              '</div>'
          }
          $('.tableBody .bodyWrap').append(html);
          pageNum++;
          isLoading = false;
        }
      }
    })
  }
}

