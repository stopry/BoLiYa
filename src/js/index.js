$(function () {
  init();
});

var indexInterval = null;//定时器

//建仓信息
var openDatas = {
  "amount": 1,//购买数量
  "buySell": "1",//买入卖出
  "depositType": "0",//押金方式
  "goodsCode": "HSAG10",//商品码
  "goodsType": "HSAG",//商品类型
  "nowPrice": 0,//当前价格
  "stopPoint": "5"//止盈止损点
};
//清空建仓数据
function clearOpenData() {
  for(key in openDatas){
    openDatas[key]=null;
  }
  console.log(openDatas);
}

//页面初始化方法
function init() {
  clipAni();
  var h = $(window).height();
  var h1 = $('#t_top').height();
  var h2 = $('#b_bot').height();
  var ch = h-h1-h2-30;
  $('#charts').height(ch);

  clearOpenData();
  loadData();

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
    if($(this).hasClass('active')) return;
    $(this).addClass('active').siblings('.tableItem').removeClass('active');
    var proType = $(this).attr('goodsType');
    curPro = proType;
    createChart(curPro,chartType);
  });
}
//图表类型切换
function changeChartType() {
  $(".charTypeSel .flexItem").click(function () {
    if($(this).hasClass('active')) return;
    $(this).addClass('active').siblings('.flexItem').removeClass('active');
    var cType = $(this).attr('id');
    chartType = cType;
    createChart(curPro,chartType);
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
function showBuyBox(type){//type 看涨看跌
  openDatas.buySell = type;
  initBuyBox();
  showLayerBlack(1);
  $('.lookUpDownOpr').addClass('active');
  if(type){
    $(".changeTable .item").eq(0).addClass('active');
    $(".changeTable .item").eq(1).removeClass('active');
  }else{
    $(".changeTable .item").eq(0).removeClass('active');
    $(".changeTable .item").eq(1).addClass('active');
  }
}
function hideBuyBox() {
  showLayerBlack(!1);
  $('.lookUpDownOpr').removeClass('active');
}

//看涨看跌选择
function changeBuyType() {
  $(".changeTable .item").click(function () {
    $(this).addClass('active').siblings('.item').removeClass('active');
    var lookUpDown = $(this).index()?0:1;//买涨1  买跌 0
    openDatas.buySell = lookUpDown;
  });
}


//合约定金选择
function earnestSel(){
  $(document).on('click','.earnestSel .selItem',function () {
    var val = $(this).html();
    $(this).addClass('active').siblings('.selItem').removeClass('active');
    var goodsCode = $(this).attr('id');
    openDatas.goodsCode = goodsCode;
  });
}
//止盈止损选择
function stopSel(){
  $(document).on('click','.stopSel .selItem',function () {
    var val = $(this).html();
    $(this).addClass('active').siblings('.selItem').removeClass('active');
    openDatas.stopPoint = val;
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
  openDatas.amount = num;
}


//加载信息
function loadData() {
  getProInfo();
  getUserInfo();
  createChart(curPro,chartType);
  getIndexUserInfo();
  setInterval(function () {
    getIndexUserInfo();
  },1000);
}

var chart = null;
var chartType = "ML";//默认分时图
//k线图有  15  30  60
function createChart(proId, kType) {
  if (kType == "ML") {
    chart = MinuteChart.createNew(proId);//分时图
  } else {
    chart = CandleChart.createNew(proId, kType);//K线图
  }
  clearInterval(indexInterval);
  chart.createChart();
  updateChart();
  GlobalAutoChartM();
}
var curPro = 'HSAG';//商品类型 默认为黄金

//更新图表
function updateChart(){
  indexInterval = setInterval(function () {
    if(chartType=='ML'){//分时图
      ajaxHelper.get(getUrl('quotation/getTLine'),{goodsType:curPro},function (res) {
        if(res.success&&res.obj){
          chart.flush(res.obj);
        }
      },false)
    }else{
      ajaxHelper.get(getUrl('quotation/getKLine'),{goodsType:curPro,chartType:chartType},function (res) {
        if(res.success&&res.obj){
          chart.flush(res.obj);
        }
      },false)
    }
  },1000);
}

var proInfo = [];
//获取主页用户信息 -用户展示
function getIndexUserInfo(){
  ajaxHelper.get(getUrl('tran/acct/getMianInfo'),null,function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      var obj = res.obj;
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
        $("#Cu").removeClass('down');
      }else{
        $("#Cu").addClass('down');
      }
      var totalInfo = obj.totalInfo;
      $("#zuoshou").html(totalInfo.yeClosePrice);
      $("#jinkai").html(totalInfo.toOpenPrice);
      $("#zuigao").html(totalInfo.highPrice);
      $("#zuidi").html(totalInfo.lowPrice);
    }
  },false);
};
//初始化看涨看跌框
function initBuyBox(goodsType) {
  curPro = goodsType?goodsType:curPro;
  $(".selArea.earnestSel .selItem").eq(0).addClass('active').siblings('.selItem').removeClass('active');
  $(".selArea.stopSel .selItem").eq(0).addClass('active').siblings('.selItem').removeClass('active');
  $("#nums").html(1);
  $("#selTicket").removeClass('active');

  var curProInfo;
  for(var i = 0;i<proInfo.length;i++){
    if(proInfo[i].goodsType==curPro){
      curProInfo = proInfo[i];
      break;
    }
  }

  var list = curProInfo.list;
  var spList = curProInfo.spList;

  for(var j = 0;j<list.length;j++){
    $(".selArea.earnestSel .selItem").eq(j).attr('id',list[j].code).html(list[j].clientDepositFee);
    $(".selArea.stopSel .selItem").eq(j).attr('id',spList[j]).html(spList[j]);
  }

  openDatas.goodsCode = list[0].code;
  openDatas.goodsType = curPro;
  openDatas.stopPoint = spList[0];
  openDatas.nowPrice = curProInfo.point;
  openDatas.amount = curProInfo.minLot;


  console.log(curProInfo);

}

//确认建仓？
function conFirmTips() {
  layer.confirm('确认建仓吗？', {
    btn: ['确认'] //按钮
  }, function () {
    subOpenData();
  });
}

//提交建仓信息
function subOpenData() {
  layer.close(layer.index);
  console.log(openDatas);
  ajaxHelper.post(getUrl('tran/position/open'),openDatas,function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      showTips('建仓成功','success');
      hideBuyBox();
    }
  })
}

//更新界面信息(取消)
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

//图表自适应屏幕高度
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
//clip动画
function clipAni() {
  function ani(arr) {
    var l = arr.length;
    for(var i = 0;i<l;i++){
      $(arr[i]).removeClass("ani");
    }
    setTimeout(function () {
      for(var k = 0;k<l;k++){
        $(arr[k]).addClass("ani");
      }
    },2000);
  }
  setInterval(function () {
    var arr = [
      "#hjbk",
      "#tbk",
      "#zuoshou",
      "#jinkai",
      "#zuigao",
      "#zuidi",
    ];
    ani(arr);
  },5000);
};
