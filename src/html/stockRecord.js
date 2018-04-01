
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
  toggle();
  getData();
  //到达底部
  $(window).scroll(function () {
    if(isBot()){
      if(isLoading) return;
      getData();
      console.log(1);
    }else{
      console.log(2);
    }
  });

  function getData() {
    // console.log(pageNum);
    isLoading = true;
    //模拟加载数据
    ajaxHelper.get(getUrl('tran/position/getHisPositionlist'),{pageNum:pageNum},function (res) {
      if(!res.success){
        showTips(res.msg);
      }else{
      var list = res.obj;
      // console.log(list);
      if(list&&list.length){
      var html = '';
      for(var i = 0;i<list.length;i++){
        var item = list[i];

        var _class = item.financialGrossProfit>0?'add':'rde';
        var _statuCon = item.financialGrossProfit>0?'赚':'亏';
        var _money = item.financialGrossProfit;
        var _amount = item.amount;
        var _dj = item.depositType=='0'?item.depositFee:'交易券';
        var _openPrice = item.openPrice;
        var _closePrice = item.closePrice;
        var _closeType = item.financialGrossProfit>0?'止盈':'止损';
        var point = item.stopProfitLoss;
        var lookType = item.buySell=='1'?'看涨':'看跌';
        var chrFee = item.financialCharge;//手续费
        var createTime = new Date(item.createTime).Format('yyyy/MM/dd hh:mm:ss');//创建时间
        var closeTime = new Date(item.closeTime).Format('yyyy/MM/dd hh:mm:ss');//平仓时间

        html += '<div class="item borderBot rch '+_class+'">'+
          '<div class="top">'+
          '<div class="proType">'+
          '<span>商品：'+item.name+'</span>'+
        '<i class="profit">'+_statuCon+'</i>'+
          '</div>'+
          '<div class="openBtn feedBtn">'+
          '<i class="icon iconfont icon-xia">展开查看∨</i>'+
        '<i class="icon iconfont icon-shang">收起∧</i>'+
        '</div>'+
        '<div class="money">'+
          _money+
          '</div>'+
          '</div>'+
          '<div class="verObj">'+
          '<div class="item" style="overflow: visible">'+
          '<table>'+
          '<tr>'+
          '<td>数量：</td>'+
        '<td>'+_amount+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>建仓价：</td>'+
        '<td>'+_openPrice+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>平仓价：</td>'+
        '<td>'+_closePrice+'</td>'+
        '</tr>'+
        '<tr class="dateInfo">'+
          '<td>创建时间：</td>'+
        '<td>'+
        '<span>'+
        createTime+
        '</span>'+
        '</td>'+
        '</tr>'+
        '<tr class="dateInfo" >'+
          '<td>平仓时间：</td>'+
        '<td>'+
        '<span>'+
        closeTime+
        '</span>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '</div>'+
        '<div class="item">'+
          '<table>'+
          '<tr>'+
          '<td>定金：</td>'+
        '<td>'+_dj+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>平仓类型：</td>'+
        '<td>'+_closeType+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>止盈止损点数：</td>'+
        '<td>'+point+'（'+lookType+'）</td>'+
        '</tr>'+
        '</table>'+
        '</div>'+
        '<div class="item">'+
          '<table>'+
          '<tr>'+
          '<td></td>'+
          '<td></td>'+
          '</tr>'+
          '<tr>'+
          '<td></td>'+
          '<td></td>'+
          '</tr>'+
          '<tr>'+
          '<td colspan="2">手续费：'+chrFee+'</td>'+
        '<!--<td>12.00</td>-->'+
        '</tr>'+
        '</table>'+
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
