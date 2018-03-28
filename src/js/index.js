$(function () {
  init();
});

//页面初始化方法
function init() {

  getUserInfo();

  var h = $(window).height();
  var h1 = $('#t_top').height();
  var h2 = $('#b_bot').height();
  var ch = h-h1-h2-30;
  $('#charts').height(ch);

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

  $(".imgEye").click(function () {
    $(this).toggleClass('close');
    var isHide = $(this).hasClass('close');
    if(isHide){
      $(".showMoney").hide();
      $(".hideMoney").show();
    }else{
      $(".showMoney").show();
      $(".hideMoney").hide();
    }
  });
}

//商品类型切换
function changeProType() {
  $(".chartTable .tableItem").click(function () {
    $(this).addClass('active').siblings('.tableItem').removeClass('active');
    var proType = $(this).attr('goodsType');
    curPro = proType;
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

//初始化图表
$(function () {
  createChart(1004,'ML');
})
var chart = null;
function createChart(proId, kType) {
  if (kType == "ML") {
    chart = MinuteChart.createNew(proId);//分时图
  } else {
    chart = CandleChart.createNew(proId, kType);//K线图
  }
  chart.createChart();
  GlobalAutoChartM();
  chart.flush()
}
var curPro = null;
var proInfo = [];
getIndexUserInfo();
//获取主页用户信息 -用户展示
function getIndexUserInfo(){
  ajaxHelper.get(getUrl('tran/acct/getMianInfo'),null,function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      var obj = res.obj;
      console.log(obj);
      var Au = obj.proTypeList[0];
      var Cu = obj.proTypeList[1];
      $("#Au").find('.pName').html(Au.name);
      $("#Au").find('.pInfo').html(Au.point);
      $("#Cu").find('.pName').html(Cu.name);
      $("#Cu").find('.pInfo').html(Cu.point);
      $("#Au").attr('goodsType',Au.goodsType);
      $("#Cu").attr('goodsType',Cu.goodsType);
      if(Au.upOrDown>0){
        $("#Au").removeClass('down');
      }else{
        $("#Au").addClass('down');
      }
      if(Cu.upOrDown>0){
        $("#Cu").addClass('down');
      }else{
        $("#Cu").removeClass('down');
      }
      var totalInfo = obj.totalInfo;
      $("#zuoshou").html(totalInfo.yeClosePrice);
      $("#jinkai").html(totalInfo.toOpenPrice);
      $("#zuigao").html(totalInfo.highPrice);
      $("#zuidi").html(totalInfo.lowPrice);
    }
  });
}
//更新界面信息
function updatePageInfo(goodsType){
  curPro = goodsType?goodsType:curPro;
  ajaxHelper.get(getUrl('tran/infoTimer/getInfoTimer'),{goodsType:curPro},function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      var totalInfo = res.obj.quotation;
      $("#zuoshou").html(totalInfo.yeClosePrice);
      $("#jinkai").html(totalInfo.toOpenPrice);
      $("#zuigao").html(totalInfo.highPrice);
      $("#zuidi").html(totalInfo.lowPrice);

    }
  });
};


//获取商品信息
function getProInfo(){
  ajaxHelper.get(getUrl('goods/getGoodsTypelist'),null,function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      proInfo = [];
      var obj = res.obj;
      var pro_o = obj[0];
      var pro_t = obj[1];
      proInfo.push(pro_o);
      proInfo.push(pro_t);
    }
  })
};

//图标自适应屏幕高度
function GlobalAutoChartM() {
  var h = $(window).height();
  var h1 = $('#t_top').height();
  var h2 = $('#b_bot').height();
  var ch = h-h1-h2-30;
  chart.setChartHeight(ch-h*0.08);
}
//获取用户信息
function getUserInfo() {
  ajaxHelper.get(getUrl('tran/acct/get'),null,function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      var obj = res.obj;
      $("#userImg").attr('src',obj.hearimgUrl);
      $("#all_money").html((obj.balance).toFixed(2));
    }
  })
};
