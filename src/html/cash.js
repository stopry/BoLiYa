
var timer = 90;
var interVal = null;

//表单数据
var cashDatas = {
  money: null,//提现金额
  type: null,//提现方式
  bank: null,//提现银行
  prov: null,//开户省
  city: null,//开户市
  cardNum: null,//卡号
  name: null,//姓名
};

$(function () {
  init();
});

function init() {
  _init_area();//初始化地区选择
  objVerticalCenter(".selBankBox");//垂直居中选择框\
  $(".selCashBank").click(function () {
    showLayerBlack(1);
    $(".selBankBox").addClass('active');
  });

  $(".closeBtn").click(function () {
    showLayerBlack(false);
    $(".selBankBox").removeClass('active');
  });

  $(".selBankBox .selBankList .bankListItem").click(function () {
    var _index = $(this).find(".bankName").html();
    var _img = $(this).find('.bankPic img').attr('src');
    $("#bankName").html(_index);
    $('.bankLogo img').attr('src',_img).css('width','100%').css('height','auto');
    $(".closeBtn").click();
  });

  //省份返回上一页
  $(".provList .closeThis").click(function(){
    $(".provList").removeClass("active");
  })
  //城市返回上一页
  $(".cityList .closeThis").click(function(){
    $(".cityList").removeClass("active");
    $(".provList").addClass("active");
  })

  //地区选择
  $(".toSelArea").click(function(){
    var proList = "";//省份列表
    var cityList = "";//城市列表
    $("#s_province option").each(function(){
      proList+='<li class="listItem porel feedBtn">'+
        '<span>'+$(this).attr("value")+'</span>'+
        '<i class="icon iconfont icon-right"></i>'+
        '</li>'
    });
    $(".provList .listWrap").html(proList);
    $(".provList").addClass("active");
  });
  //选择省份
  $(document).on("click",".provList .listWrap .listItem",function(){
    var citylist = "";
    var pro = $(this).find("span").html();
    if(pro=="省份") return;
    cashDatas.prov = pro;
    $("#s_province").val(pro).change();
    $("#s_city option").each(function(){
      citylist+='<li class="listItem porel feedBtn">'+
        '<span>'+$(this).attr("value")+'</span>'+
        '<i class="icon iconfont icon-right"></i>'+
        '</li>'
    });
    $(".cityList .listWrap").html(citylist);
    $(".provList").removeClass("active");
    $(".cityList").addClass("active");
  });
  //选择城市
  $(document).on("click",".cityList .listWrap .listItem",function(){
    var citylist = "";
    var city = $(this).find("span").html();
    if(city=="地级市") return;
    cashDatas.city = city;
    $(".provList").removeClass("active");
    $(".cityList").removeClass("active");
    console.log(cashDatas);
    $(".areaWrap .provice").html(cashDatas.prov);
    $(".areaWrap .city").html(cashDatas.city);
  });
}

