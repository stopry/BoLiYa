$(function () {
  init();
});

//页面初始化方法
function init() {
  changeProType();
  changeChartType();
  objVerticalCenter('.tipsAlert');
  changeBuyType();
  $(document).on('click','.layerShadow2',function () {
    hideBuyBox();
  });
  earnestSel();
  stopSel();
  ticketSel();
}

//商品类型切换
function changeProType() {
  $(".chartTable .tableItem").click(function () {
    $(this).addClass('active').siblings('.tableItem').removeClass('active');
  });
}
//图表类型切换
function changeChartType() {
  $(".charTypeSel .flexItem").click(function () {
    $(this).addClass('active').siblings('.flexItem').removeClass('active');
  })
}

function showTipsAlert() {
  $('.tipsAlert').show();
  showLayerBlack(1);
}
function hideTipsAlert() {
  $('.tipsAlert').hide();
  showLayerBlack(!1);
}
//显示购买弹框
function showBuyBox(){
  showLayerBlack(1);
  $('.lookUpDownOpr').addClass('active');
}
function hideBuyBox() {
  showLayerBlack(!1);
  $('.lookUpDownOpr').removeClass('active');
}

//看涨看跌选择
function changeBuyType() {
  $(".changeTable .item").click(function () {
    $(this).addClass('active').siblings('.item').removeClass('active');
  });
}


//合约定金选择
function earnestSel(){
  $('.earnestSel .selItem').click(function () {
    var val = $(this).html();
    $(this).addClass('active').siblings('.selItem').removeClass('active');
  });
}
//止盈止损选择
function stopSel(){
  $('.stopSel .selItem').click(function () {
    var val = $(this).html();
    $(this).addClass('active').siblings('.selItem').removeClass('active');
  });
}

//交易券选择
function ticketSel() {
  $('.ticketSel .selItem').click(function () {
    var num = parseInt($('.ticketNum').html());
    var isSel = $(this).hasClass('active');
    if(num>0){
      if(isSel){
        $(this).removeClass('active');
      }else{
        $(this).addClass('active');
      }
    }else{
      showTips('您没有多余的交易券','warm');
    }
  });
}
//交易数量增减
function changTradAmt(type){
  var tar = $("#nums");
  var num = parseInt(tar.html());
  if(type){
    if(num>9){
      return;
    }
    num++
  }else {
    if(num<2){
      return;
    }
    num--
  }
  tar.html(num);
}
