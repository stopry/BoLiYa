
$(function () {
  init();
});

var way = "";
var serName;

var formData = {
  amt:4998,//充值金额
  type:1,//充值方式-默认银盛
};

function init() {
  renderPage();
  $(".eyes").click(function () {
    $(this).toggleClass('active');
    var isHide = $(this).hasClass('active');
    if(!isHide){
      $(".showMoney").hide();
      $(".hideMoney").show();
    }else{
      $(".showMoney").show();
      $(".hideMoney").hide();
    }
  });
  selMoneyAmt();
  getPayList();
}

//金额数量选择
function selMoneyAmt(){
  $("#moneySelBox .item").click(function () {
    var num = $(this).html();
    $(this).addClass('active').siblings('.item').removeClass('active');
    $("#rchMoney").val(num);
    formData.amt = num;
  });
}

function resetForm(){

};

function subRecharge() {
  var recDatas = formData;

  if (recDatas.amt % 10 == 0) {
    showTips('不能充值0结尾的数额，如20，100等');
    return;
  }

  console.log(recDatas, '充值数据');

  var type = recDatas.type;
  if (type == 1) {

    var payType = "0";
    if (Util.checkEquipment() == 'wx' || Util.checkEquipment() == 'mobile') {
      payType = "1";
    }
    window.location.href = '/pay/yspay.html?payType=' + payType + '&amt=' + formData.amt;
  } else if (type == 2) {
    if (recDatas.amt > 1000) {
      showTips("支付宝扫码单笔充值不能超过1000元");
      return;
    }
    ajaxHelper.get(getUrl('tran/pay/payByYSQrCode'), recDatas, function (ret) {
      if (ret.success) {
        location.href = "/pay/aliScanCode.html?qrCode=" + ret.obj;
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 3) {
    if (recDatas.amt > 1000) {
      showTips("微信扫码单笔充值不能超过1000元");
      return;
    }

    ajaxHelper.get(getUrl('tran/pay/payByYSQrCode'), recDatas, function (ret) {
      if (ret.success) {
        location.href = "/pay/wxScanCode_content.html?qrCode=" + ret.obj;
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 4) {
    if (recDatas.amt > 5000) {
      showTips("快捷支付充值不能超过5000元");
      return;
    }

    ajaxHelper.get(getUrl('tran/pay/toYeePay'), {
      'amt': recDatas.amt,
      'fcallbackurl': 'http://pay.kaikaiusa.com/fcall/' + serName + '.html'
    }, function (ret) {
      console.log(ret);
      if (ret.success) {
        var url = ret.obj;
        if (url == null || url == '') {
          showTips('支付失败','error');
          return;
        }
        location.href = url;
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 5) {
    ajaxHelper.get(getUrl('tran/pay/toYopFastPay'), {
      'amt': recDatas.amt,
      'fcallbackurl': 'http://pay.jmysq.cn/fcall/' + serName + '.html'
    }, function (ret) {
      if (ret.success) {
        var url = ret.obj.url;
        var payUrl = ret.obj.payUrl;
        if (url == null || url == '') {
          showTips('支付失败');
          return;
        }
        localStorage.setItem('YOPPAY_url', url);
        localStorage.setItem('YOPPAY_payUrl', payUrl);
        location.href = "/pay/yoppay.html";
      } else {
        showTips(ret.msg);
      }


    });
  } else if (type == 6) {
    ajaxHelper.get(getUrl('tran/pay/toWftAliScanPay'), recDatas, function (ret) {
      if (ret.success) {
        location.href = "/pay/aliScanCode.html?qrCode=" + ret.obj;
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 7) {
    ajaxHelper.get(getUrl('tran/pay/toWftWxScanPay'), recDatas, function (ret) {
      if (ret.success) {
        location.href = "/pay/wxScanCode_content.html?qrCode=" + ret.obj;
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 9) {
    if (recDatas.amt > 5000) {
      showTips("快捷支付充值不能超过5000元");
      return;
    }
    ajaxHelper.get(getUrl('tran/pay/toJPQuickPay'), {
      'amt': recDatas.amt,
      'fcallbackurl': 'http://pay.kaikaiusa.com/fcall/' + serName + '.html'
    }, function (ret) {
      if (ret.success) {
        var unionpayC = ret.obj;
        localStorage.setItem("unionpayC", unionpayC);
        window.location.href = '/pay/jpQuickPay.html';
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 10) {
    ajaxHelper.get(getUrl('tran/pay/toSandH5Pay'), {
      'amt': recDatas.amt
    }, function (ret) {
      if (ret.success) {
        var responseText = ret.obj;
        paymentjs.createPayment(responseText, function (result, err) {
          console.log(result);
          console.log(err.msg);
          console.log(err.extra);
        });
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 11) {
    ajaxHelper.get(getUrl('tran/pay/toSandFastPay'), {
      'amt': recDatas.amt,
      'fcallbackurl': 'http://pay.kaikaiusa.com/fcall/' + serName + '.html'
    }, function (ret) {
      if (ret.success) {
        console.log(ret);
        localStorage.setItem('data', ret.obj.data);
        localStorage.setItem('sign', ret.obj.sign);
        localStorage.setItem('uri', ret.obj.uri);
        window.location.href = '/pay/sandpay.html';
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 12) {
    ajaxHelper.get(getUrl('tran/pay/toIPSGateWayPay'), {
      'amt': recDatas.amt,
      'fcallbackurl': 'http://pay.kaikaiusa.com/' + serName + '/postcall/fcall',
      'cardType': '01'
    }, function (ret) {
      if (ret.success) {
        $.base64.utf8encode = true;
        var pGateWayReq = $.base64.btoa(encodeURI(ret.obj.pGateWayReq));
        var action = $.base64.btoa(ret.obj.action);
        window.location.href = 'http://pay.kaikaiusa.com/ipsPay.html?pGateWayReq=' + pGateWayReq + '&action=' + action;
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 13) {
    ajaxHelper.get(getUrl('tran/pay/toIPSFastPay'), {
      'amt': recDatas.amt,
      'fcallbackurl': 'http://pay.kaikaiusa.com/' + serName + '/postcall/fcall',
      'way': way
    }, function (ret) {
      if (ret.success) {
        $.base64.utf8encode = true;
        var pGateWayReq = $.base64.btoa(encodeURI(ret.obj.pGateWayReq));
        var action = $.base64.btoa(ret.obj.action);
        localStorage.setItem('pGateWayReq', pGateWayReq);
        localStorage.setItem('action', action);
        window.location.href = '/pay/ipspay.html'
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 14) {
    ajaxHelper.get(getUrl('tran/pay/toSand2Pay'), {
      'amt': recDatas.amt,
      'fcallbackurl': 'http://pay.kaikaiusa.com/' + serName + '/postcall/fcall',
      'way': way
    }, function (ret) {
      if (ret.success) {
        var unionpayC = ret.obj;
        localStorage.setItem("unionpayC", unionpayC);
        window.location.href = '/pay/jpQuickPay.html';
      } else {
        showTips(ret.msg);
      }

    });
  } else if (type == 15) {
    ajaxHelper.get(getUrl('tran/pay/payByPaymaxH5'), {
      'amt': recDatas.amt,
      'fcallbackurl': 'http://pay.kaikaiusa.com/' + serName + '/postcall/fcall',
      'backurl': 'http://pay.kaikaiusa.com/' + serName + '/postcall/fcall'
    }, function (ret) {
      if (ret.success) {
        var unionpayC = ret.obj;
        localStorage.setItem("unionpayC", unionpayC);
        window.location.href = '/pay/jpQuickPay.html';
      } else {
        showTips(ret.msg);
      }

    });
  }

}

//提交数据
function subData() {
  var rchMoney = $('#rchMoney').val();
  formData.amt = rchMoney;
  console.log(formData);
  if(!rchMoney){
    showTips('请输入充值金额')
  }else{
    subRecharge();
    //showTips('页面跳转中,请稍等...');
  }
}

function renderPage(){
  resetForm();
  getUserInfo();
}

function getUserInfo() {
  ajaxHelper.get(getUrl('tran/acct/get'),null,function (res) {
    if(!res.success){
      showTips(res.msg);
    }else{
      var obj = res.obj;
      $("#showMoney").html((obj.balance).toFixed(2));//账户余额
    }
  })
};
//获取充值列表
function getPayList() {
  if (Util.checkEquipment() == 'other') {
    way = "WEB";
    $('#pay_4').css('display', 'block');
    $('#pay_4').addClass('chceked');
    formData.type = 4;
  } else {
    way = "WAP";
    $('#pay_4').css('display', 'block');
    $('#pay_4').addClass('chceked');
    formData.type = 4;
  }


  ajaxHelper.get(getUrl('tran/pay/listPay'), {"way": way}, function (ret) {
    if (ret.success) {
      var list = ret.obj.payList;
      serName = ret.obj.serName;
      var html = '';
      var initId = 0;
      $.each(list, function (key, val) {
        if (val.status == '1') {

          html+='<div class="cashTypeSel w100 ovhd" style="background: url('+val.pic+') no-repeat left;background-size: 0.93333rem auto">' +
            val.name +
            '          <div class="payType selIdon feedBtn" data-type = "'+val.id+ '" id="pay_'+val.id+'"></div>' +
            '        </div>';

          // html += '' +
          //   '<div class="list ks-clear feedBtn payType" data-type="' + val.id + '" id="pay_' + val.id + '">' +
          //   '    <div class="img fl">' +
          //   '        <img src="' + val.pic + '" alt="">' +
          //   '    </div>' +
          //   '    <p class="fl textOverDot">' + val.desc + '</p>' +
          //   '    <i class="poabl checkBox"></i>' +
          //   '</div>';
          if (key == 0) {
            initId = val.id;
          }
        }
      });
      $('#per-list').html(html);

      $('#pay_' + initId).css('display', 'block');
      $('#pay_' + initId).addClass('chceked');
      formData.type = initId;

      //充值方式
      $('.payType').on("click", function () {
        $(this).addClass("chceked").parent('.cashTypeSel').siblings(".cashTypeSel").children('.payType').removeClass("chceked");
        var type = $(this).data("type");
        console.log(type);
        formData.type = type;
      });
    }
  });
}
