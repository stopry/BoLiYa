
var bindMobile = null;
//表单数据
var cashDatas = {
  money: null,//提现金额
  type: null,//提现方式
  bank: null,//提现银行
  prov: null,//开户省
  city: null,//开户市
  cardNum: null,//卡号
  name: null,//姓名
  idCard:null,//持卡人身份证好
  verCode:null,//验证码
};

$(function () {
  init();
});

function init() {
  renderPage();
  var timer = 90;
  var interVal = null;

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
    cashDatas.bank = _index;
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

  function CheckBankNo(bankno) {
    var bankno = bankno;
    if (bankno == "") {
      showTips("请填写银行卡号");
      return false;
    }
    if (bankno.length < 16 || bankno.length > 19) {
      showTips("银行卡号长度必须在16到19之间");
      return false;
    }
    var num = /^\d*$/; //全数字
    if (!num.exec(bankno)) {
      showTips("银行卡号必须全为数字");
      return false;
    }
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if (strBin.indexOf(bankno.substring(0, 2)) == -1) {
      showTips("银行卡号开头6位不符合规范");
      return false;
    }
    return true;
  }

  //提交数据
  function subData() {
    cashDatas.money = $.trim($('#money').val());
    cashDatas.cardNum = ($.trim($('#cardNum').val())).split(' ').join('');
    cashDatas.name = $.trim($('#name').val());
    cashDatas.idCard = $.trim($('#idCard').val());
    cashDatas.verCode = $.trim($('#verCode').val());
    console.log(cashDatas);
    if(!cashDatas.money){
      showTips('请输入提现金额');
    }else if(!cashDatas.bank){
      showTips('请选择银行');
    }else if(!cashDatas.prov||!cashDatas.city){
      showTips('请选择省份城市');
    }else if(!cashDatas.cardNum){
      showTips('请输入银行卡号');
    }else if(!cashDatas.name){
      showTips('请输入持卡人姓名');
    }else if(!cashDatas.idCard){
      showTips('请输入持卡人身份证号');
    }else if(!cashDatas.verCode){
      showTips('请输入验证码');
    }else if(!CheckBankNo(cashDatas.cardNum)){
      // showTips('银行卡号格式有误');
    }else{
      var subData = {
        "bankCode": "gsyh",
        "bankName": cashDatas.bank,
        "branch": "string",
        "cardId": cashDatas.idCard,
        "cardNo": cashDatas.cardNum,
        "channel": "13632473925",
        "city": cashDatas.city,
        "money": cashDatas.money,
        "name": cashDatas.name,
        "province": cashDatas.prov,
        "vcode": cashDatas.verCode
      };
      ajaxHelper.post(getUrl('oauth/token'),subData,function (res) {
        if(res.success){
          oauth.clean();
          resetForm();
          showTips('登陆成功','success');
          setTimeout(function () {
            openLocal('/html/logIn.html');
          },2000);
        }else{
          showTips(res.msg);
        }
      })
    }
  }
  $("#confirm").click(function () {
    subData();
  });

}
//格式化银行卡
function formatBankNo (BankNo){
  if (BankNo.value == "") return;
  var account = new String (BankNo.value);
  account = account.substring(0,22); /*帐号的总数, 包括空格在内 */
  if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
    /* 对照格式 */
    if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
        ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
      var accountNumeric = accountChar = "", i;
      for (i=0;i<account.length;i++){
        accountChar = account.substr (i,1);
        if (!isNaN (accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
      }
      account = "";
      for (i=0;i<accountNumeric.length;i++){    /* 可将以下空格改为-,效果也不错 */
        if (i == 4) account = account + " "; /* 帐号第四位数后加空格 */
        if (i == 8) account = account + " "; /* 帐号第八位数后加空格 */
        if (i == 12) account = account + " ";/* 帐号第十二位后数后加空格 */
        account = account + accountNumeric.substr (i,1)
      }
    }
  }
  else
  {
    account = " " + account.substring (1,5) + " " + account.substring (6,10) + " " + account.substring (14,18) + "-" + account.substring(18,25);
  }
  if (account != BankNo.value) BankNo.value = account;
}
//初始化页面
function renderPage(){
  getUserInfo();
  getBindInfo();
  getVerCode();
}

//获取账户绑定信息
function getBindInfo() {
  ajaxHelper.get(getUrl('tran/acct/getBank'),null,function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      var obj = res.obj;
      if(obj.cardNo!=null&&obj.branchBank!=null){
        $("#provice").html(obj.province);
        cashDatas.prov = obj.province;
        $("#city").html(obj.city);
        cashDatas.city = obj.city;
      }
    }
  })
};
//获取用户信息
function getUserInfo() {
  ajaxHelper.get(getUrl('tran/acct/get'),null,function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      var obj = res.obj;
      $("#keyong").html((obj.usableDeposit).toFixed(2));//可用保证金
      bindMobile = obj.mobile;
      $("#bindMobile").html(bindMobile);
    }
  })
};
//获取验证码
function getVerCode() {
  var timer = 90;
  var interVal = null;
  $('#getVerCode').click(function () {
    getVerCode();
  });

  //获取验证码
  function getVerCode() {
    // var mobile = $.trim($('#bindMobile').val());
    // if(!mobile){
    //   showTips('请输入手机号');
    //   return;
    // }else if(!validate.checkMobile(mobile)){
    //   showTips('手机号格式有误');
    //   return;
    // }
    if(!canGetVcode){
      showTips('请稍后再试');
      return;
    }
    ajaxHelper.get(getUrl('tran/sms/sendWithdrawsSms'),null,function(res){
      if(!res.success){
        showTips(res.msg)
      }else {
        vCodeCount("#getVerCode",interVal,timer);
        showTips('验证码发送成功');
      }
    })
  }
}
