//公用脚本
$(function () {
  FastClick.attach(document.body);
  _Z.ui.feedbtn('.feedBtn');
  $('input:not([autocomplete]),textarea:not([autocomplete]),select:not([autocomplete])').attr('autocomplete', 'off');

  function autoFooterHeader(){
    var winWidth = $(window).width();
    var fwidth = 600;
    var left = (winWidth-fwidth)/2;
    $(".nowChiCang ").css("left",left+'px');
    $(".lookUpDownOpr").css("left",left+'px');
    $("#order_list_icon").css("right",left+20+'px');
    $("#layer").css("left",left+'px');
    $(".closeCiChang").css("left",left+'px');
    $(".tableHeader").css("left",left+'px');
    $(".areaList").css("left",left+'px');
    $("#searchHistory").css("left",left+'px');
  }
  function setFont() {
    var _winW = $(window).width();
    if(_winW>640){
      $('html').css('font-size','60px');
    }
  }

  function setHF(){
    if(isPc()){
      setFont();
      $(window).resize(function () {
        setFont()
      });
      autoFooterHeader();
      $(window).resize(function(){
        autoFooterHeader();
      })
    }
  }
  setHF();

});
apiHost = 'http://api.zjiayuan.com';
//跳转脚本
function openLocal(uri) {
  uri = uri||'/';
  window.location.href = uri;
  // window.location.href = '/BoLiYa/src'+uri;
}
//判断是否是pc
function isPc() {
  var ua = window.navigator.userAgent.toLowerCase();//微信
  var u = navigator.userAgent;//手机类型android或ios
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){//微信
    return false;
  }else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
    return false;
  } else if (u.indexOf('iPhone') > -1) {//苹果手机
    return false;
  } else {
    return true;
  }
};
//显示提示信息
function showTips(msg,cla) {
  msg = msg || '空';
  cla = cla || '';
  var timer = null;
  $('#alertWeek').remove();
  var $alert = $('<div class="week-alert '+cla+'" id="alertWeek"></div>');
  $('body').append($alert);
  if(isPc()){
    var winWidth = $(window).width();
    var left = (winWidth-600)/2;
    $('#alertWeek').css('left',left+'px');
  }
  $alert.html(msg);
  $alert.addClass('alert-show');
  clearTimeout(timer);
  timer = setTimeout(function ()  {
    $alert.remove();
  }, 1900);
};

//显示关闭加载 TRUE显示 false关闭 默认打开
function showLoading(bool) {
  if(bool){
    $('#loadingToast').remove();
    var loading = $(
      "<div id=\"loadingToast\" style=\"opacity: 1; display: block;\">\n" +
      "    <div class=\"weui-mask_transparent\"></div>\n" +
      "    <div class=\"weui-toast\">\n" +
      "      <i class=\"weui-loading weui-icon_toast\"></i>\n" +
      "      <p class=\"weui-toast__content\">数据加载中</p>\n" +
      "    </div>\n" +
      "  </div>"
    );
    $('body').append(loading);
  }else{
    $('#loadingToast').remove();
  }
};

//显示遮罩层
function showLayer(bool) {
  $('.layerShadow').remove();
  if(bool){
    var $alert = $('<div class="layerShadow"></div>');
    $('body').append($alert);
  }else{
    $('.layerShadow').remove();
  }
};
//显示带背景色的遮罩层
function showLayerBlack(bool) {
  $('.layerShadow2').remove();
  if(bool){
    var $alert = $('<div class="layerShadow2"></div>');
    $('body').append($alert);
  }else{
    $('.layerShadow2').remove();
  }
};
//固定定位元素垂直居中
function objVerticalCenter(obj){
  var h = $(window).height();
  var w = $(window).width();
  var ow = $(obj).width();
  var oh = $(obj).height();
  var l = (w-ow)/2+'px';
  var t = (h-oh)/2+'px';
  $(obj).css({top:t,left:l});
};
//显示确认对话框的遮罩层
function showLayerDia(bool) {
  $('.layerShadow3').remove();
  if(bool){
    var $alert = $('<div class="layerShadow3"></div>');
    $('body').append($alert);
  }else{
    $('.layerShadow3').remove();
  }
};
//显示操作确认框
function showConDia(text,confirmFn,cancelFn){
  var body = $('body');
  showLayerDia(1);

  var confirDia =$(
    '<div class="confirmDia">'+
    '<div class="conHeader"><i class="closeThis feedbtn">×</i></div>'+
    '<div class="diaText">'+
    text+
    '</div>'+
    '<div class="btnWrap">'+
    '<div class="opBtn cancelBtn fl feedbtn">'+
    '取消'+
    '</div>'+
    '<div class="opBtn confimBtn fr feedbtn">'+
    '确定'+
    '</div>'+
    '</div>'+
    '</div>'
  );
  confirDia.css({
    height:'200px',
    top:($(window).height()-200)/2
  });
  body.append(confirDia);
  confirDia.find('.cancelBtn').click(function(){
    cancelFn();
    confirDia.remove();
    $('.confirmDia').remove();
    showLayerDia(!1);
  });
  confirDia.find('.confimBtn').click(function(){
    confirmFn();
    $('.confirmDia').remove();
    confirDia.remove();
    showLayerDia(!1);
  });
  //关闭
  confirDia.find('.closeThis').click(function(){
    $('.confirmDia').remove();
    confirDia.remove();
    showLayerDia(!1);
  });
};
//显示带输入框的确认框
function showConIpt(text,confirmFn,cancelFn){
  var body = $('body');
  showLayerDia(1);
  var confirDia =$(
    '<div class="confirmDia">'+
    '<div class="conHeader"><i class="closeThis feedbtn">×</i></div>'+
    '<div class="diaText">'+
    text+
    '</div>'+
    '<input type="password" placeholder="请输入交易密码" id="payPwd">'+
    '<div class="btnWrap">'+
    '<div class="opBtn cancelBtn fl feedbtn">'+
    '取消'+
    '</div>'+
    '<div class="opBtn confimBtn fr feedbtn">'+
    '确定'+
    '</div>'+
    '</div>'+
    '</div>'
  );
  confirDia.css({
    height:'200px',
    top:($(window).height()-200)/2
  });
  body.append(confirDia);
  confirDia.find('.cancelBtn').click(function(){
    cancelFn();
    confirDia.remove();
    showLayerDia(!1);
  });
  confirDia.find('.confimBtn').click(function(){
    var pwd = confirDia.find('#payPwd').val();
    if(!pwd){
      showTips('请输入交易密码','error');
      return;
    }
    confirmFn(pwd);
    confirDia.remove();
    showLayerDia(!1);
  });
  //关闭
  confirDia.find('.closeThis').click(function(){
    confirDia.remove();
    showLayerDia(!1);
  });
};
//判断页面是否到达底部
function isBot(){
  var wh = $(window).height();
  var sct = $(window).scrollTop();
  var dh = $(document).height();
  if(wh+sct===dh){
    //到达底部
    return true;
  }
  //没有
  return false;
};
//验证码倒计时
/**
 *@obj 获取验证码的按钮
 *@_interVal 倒计时
 *@_timer 倒计时时间
 *
 * *  */
var canGetVcode = true;//是否可以获取验证码
function vCodeCount(obj,_interVal,_timer){
  canGetVcode = false;
  console.log(canGetVcode,444);
  $(obj).addClass('disable');
  _interVal = setInterval(function () {
    _timer -- ;
    $(obj).html(_timer);
    if(_timer<=0){
      clearInterval(_interVal);
      canGetVcode = true;
      _timer = 90;
      $(obj).removeClass('disable');
      $(obj).html('重新获取');
    }
  },1000);
};

var ajaxHelper = {
  //purl 是接口url
  //data是传入参数
  //callbacl是成功后的回调函数
  //async是同步异步开发，默认异步可不传，如需同步，则必须传false
  //showload 是否展示加载动画
  post: function (purl, data, callback, showLoad, comcall,errcall) {
    if (showLoad == void(0)) {
      showLoad = true;
    }
    $.ajax({
      type: 'POST',
      url: purl,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      dataType: 'json',
      success: function (result) {

        var code = result.code;
        if (code == '401') {
          oauth.clean();
          layer.confirm('亲爱的玩家，您尚未登陆', {
            btn: ['去登录'] //按钮
          }, function () {
            openLocal('/html/logIn.html');
            // location.href = '/html/logIn.html';
          });
        }
        callback && callback(result);
      },
      error: function (info) {
        if (showLoad) {
          // $("#ajaxloading").hide();
          showLoading(false);
        }
        //layer.msg(info.state)
        if (info.status == 401) {
          layer.confirm('亲爱的玩家，您尚未登陆', {
            btn: ['去登录'] //按钮
          }, function () {
            openLocal('/html/logIn.html');
            // location.href = '/html/logIn.html';
          });
        } else {
          showTips('网络错误','error');
        }
        if(errcall){
          errcall();
        }
      },
      complete: function (xhr, status) {
        if (showLoad) {
          showLoading(false);
          // $("#ajaxloading").hide();
        }
        if(comcall){
          comcall();
        }
      }, beforeSend: function (request) {
        request.setRequestHeader("Authorization", 'bearer ' + oauth.getToken());
        if (showLoad) {
          showLoading(true);
        }
      }
    });
  },
  get: function (purl, data, callback, showLoad, async) {
    if (async == void(0)) {
      async = true;
    }
    if (showLoad == void(0)) {
      showLoad = true;
    }
    $.ajax({
      type: 'GET',
      url: purl,
      data: data,
      async: async,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      success: function (result) {
        if (showLoad) {
          // $("#ajaxloading").hide();
          showLoading(false);
        }
        var code = result.code;
        if (code == '401') {
          oauth.clean();
          layer.confirm('亲爱的玩家，您尚未登陆', {
            btn: ['去登录'] //按钮
          }, function () {
            openLocal('/html/logIn.html');
            // location.href = '/html/logIn.html';
          });
        }
        callback && callback(result);
      },
      error: function (info) {
        if (showLoad) {
          // $("#ajaxloading").hide();
          showLoading(false);
        }
        if (info.status == 401) {
          layer.confirm('亲爱的玩家，您尚未登陆', {
            btn: ['去登录'] //按钮
          }, function () {
            openLocal('/html/logIn.html');
            // location.href = '/html/logIn.html';
          });
        } else {
          showTips('网络错误','error');
        }
      },
      complete: function (xhr, status) {
        showLoading(false)
      }, beforeSend: function (request) {
        request.setRequestHeader("Authorization", 'bearer ' + oauth.getToken());
        if (showLoad) {
          // $("#ajaxloading").show();
          showLoading(true);
        }
      }
    });
  }
};

var Util = {
  getQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  },
  getQueryParam: function () {
    var paras = [];
    var r = window.location.search;
    if (r.indexOf("?") >= 0) {
      r = r.substr(1);
    }
    var urlStr;
    if (r && r != '') {
      urlStr = r.split('&');
    }
    if (urlStr && urlStr.length > 0) {
      for (var i = 0; i < urlStr.length; i++) {
        var p = urlStr[i].split('=');
        var v = {};
        if (p.length > 1) {
          v = {key: p[0], val: p[1]};
        } else if (p.length = 1) {
          v = {key: p[0], val: ''};
        }
        paras.push(v);
      }
    }
    return paras;
  },
  formatDate: function (now) {
    if(null == now){
      return "";
    }
    var year = new Date(now).getFullYear();
    var month = new Date(now).getMonth() + 1 >= 10 ? new Date(now).getMonth() + 1 : '0' + (new Date(now).getMonth() + 1);
    var date = new Date(now).getDate() >= 10 ? new Date(now).getDate() : '0' + new Date(now).getDate();
    var hour = new Date(now).getHours() >= 10 ? new Date(now).getHours() : '0' + new Date(now).getHours();
    var minute = new Date(now).getMinutes() >= 10 ? new Date(now).getMinutes() : '0' + new Date(now).getMinutes();
    var second = new Date(now).getSeconds() >= 10 ? new Date(now).getSeconds() : '0' + new Date(now).getSeconds();
    return year + "-" + month + "-" + date + "&nbsp;&nbsp;" + (hour == '0' ? '00' : hour) + ":" + (minute == '0' ? '00' : minute) + ":" + (second == '0' ? '00' : second);
  },
  isWeiXin: function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  checkEquipment: function () {
    var ua = window.navigator.userAgent.toLowerCase();//微信
    var u = navigator.userAgent;//手机类型android或ios
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {//微信
      console.log('微信');
      return 'WX';
    } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
      console.log('android');
      return 'android';
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
      console.log('ios');
      return 'ios';
    } else {//其他设备
      console.log('other');
      return 'other';
    }
  },
  formatMoney: function (amount, len) {
    var a = new Number(amount);
    if (!a) {
      return '0.00';
    } else {
      return a.toFixed(len);
    }
  },
  getFilenameSuffix:function (filename){
    var pos = filename.lastIndexOf('.')
    var suffix = '';
    if (pos != -1) {
      suffix = filename.substring(pos)
    }
    return suffix;
  },
  createUUID: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  checkMobile: function (str) {
    var re = /^1\d{10}$/
    if (re.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  //阿拉伯数字转换为简写汉字
  A2C: function (Num) {
    for (i = Num.length - 1; i >= 0; i--) {
      Num = Num.replace(",", "")//替换Num中的“,”
      Num = Num.replace(" ", "")//替换Num中的空格
    }
    if (isNaN(Num)) { //验证输入的字符是否为数字
      //alert("请检查小写金额是否正确");
      return;
    }
    //字符处理完毕后开始转换，采用前后两部分分别转换
    part = String(Num).split(".");
    newchar = "";
    //小数点前进行转化
    for (i = part[0].length - 1; i >= 0; i--) {
      if (part[0].length > 10) {
        //alert("位数过大，无法计算");
        return "";
      }//若数量超过拾亿单位，提示
      tmpnewchar = ""
      perchar = part[0].charAt(i);
      switch (perchar) {
        case "0":
          tmpnewchar = "零" + tmpnewchar;
          break;
        case "1":
          tmpnewchar = "一" + tmpnewchar;
          break;
        case "2":
          tmpnewchar = "二" + tmpnewchar;
          break;
        case "3":
          tmpnewchar = "三" + tmpnewchar;
          break;
        case "4":
          tmpnewchar = "四" + tmpnewchar;
          break;
        case "5":
          tmpnewchar = "五" + tmpnewchar;
          break;
        case "6":
          tmpnewchar = "六" + tmpnewchar;
          break;
        case "7":
          tmpnewchar = "七" + tmpnewchar;
          break;
        case "8":
          tmpnewchar = "八" + tmpnewchar;
          break;
        case "9":
          tmpnewchar = "九" + tmpnewchar;
          break;
      }
      switch (part[0].length - i - 1) {
        case 0:
          tmpnewchar = tmpnewchar;
          break;
        case 1:
          if (perchar != 0) tmpnewchar = tmpnewchar + "十";
          break;
        case 2:
          if (perchar != 0) tmpnewchar = tmpnewchar + "百";
          break;
        case 3:
          if (perchar != 0) tmpnewchar = tmpnewchar + "千";
          break;
        case 4:
          tmpnewchar = tmpnewchar + "万";
          break;
        case 5:
          if (perchar != 0) tmpnewchar = tmpnewchar + "十";
          break;
        case 6:
          if (perchar != 0) tmpnewchar = tmpnewchar + "百";
          break;
        case 7:
          if (perchar != 0) tmpnewchar = tmpnewchar + "千";
          break;
        case 8:
          tmpnewchar = tmpnewchar + "亿";
          break;
        case 9:
          tmpnewchar = tmpnewchar + "十";
          break;
      }
      newchar = tmpnewchar + newchar;
    }
    //替换所有无用汉字，直到没有此类无用的数字为止
    while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
      newchar = newchar.replace("零亿", "亿");
      newchar = newchar.replace("亿万", "亿");
      newchar = newchar.replace("零万", "万");
      newchar = newchar.replace("零零", "零");
    }
    //替换以“一十”开头的，为“十”
    if (newchar.indexOf("一十") == 0) {
      newchar = newchar.substr(1);
    }
    //替换以“零”结尾的，为“”
    if (newchar.lastIndexOf("零") == newchar.length - 1) {
      newchar = newchar.substr(0, newchar.length - 1);
    }
    return newchar;
  },
  formatMobile: function (mobile) {
    var eIndex = mobile.length - 4 < 0 ? 0 : mobile.length - 4;
    return mobile.substr(0, 3) + "****" + mobile.substr(eIndex);
  },
  get_filename_suffix: function (filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
      suffix = filename.substring(pos)
    }
    return suffix;
  }
};

var oauth = {
  getToken: function () {
    var token = localStorage.getItem('AUTHORIZATION');
    return token;
  },
  setToken: function (token) {
    localStorage.setItem('AUTHORIZATION', token);
  },
  clean: function () {
    localStorage.removeItem('AUTHORIZATION');
  },
  check: function (succ, error) {
    $.ajax({
      type: 'GET',
      url: getUrl('security/checkAuth'),
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      success: function (result) {
        var code = result.code;
        if (code == '401') {
          oauth.clean();
        }
        succ && succ(result);
      },
      error: function (info) {
        var code = info.code;
        if (code == '401') {
          oauth.clean();
        }
        error && error(info);
      },
      complete: function (xhr, status) {

      }, beforeSend: function (request) {
        request.setRequestHeader("Authorization", 'bearer ' + oauth.getToken());
      }
    });
  }

}


Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

var Lock = {
  createNew: function () {
    var lock = {};
    lock.flag = true;
    lock.lockCnt = 0;
    lock.releaseCnt = 0;
    /**
     * 获取锁
     * @returns {boolean}
     */
    lock.getLock = function (timeout) {
      timeout = timeout||10*1000;
      if (lock.flag) {
        lock.flag = false;
        lock.lockCnt++;
        // 10秒后检查，未释放时将自动释放
        setTimeout(function () {
          if (!lock.flag && lock.lockCnt - lock.releaseCnt == 1) {
            lock.flag = true;
            lock.releaseCnt++;
          }
        }, timeout);
        return true;
      } else {
        return false;
      }
    };
    /**
     * 释放锁
     */
    lock.release = function () {
      if (!lock.flag) {
        lock.flag = true;
        lock.releaseCnt++;
      }
    }
    return lock;
  }
};

var FormUtil = {
  getParaVal: function (str) {
    var ret = $.trim($(str).val());
    if (!ret || ret == '' || ret == undefined) {
      return null;
    }
    return ret;
  },
  getParaValNum: function (str) {
    try {
      var ret = $.trim($(str).val());
      if (!ret || ret == '' || ret == undefined) {
        return 0;
      }
      return parseFloat(ret);
    } catch (e) {
      return 0;
    }
  },
  getParaHtml: function () {
    var ret = $.trim($(str).html());
    if (!ret || ret == '' || ret == undefined) {
      return null;
    }
    return ret;
  }
};
var validate = {
  //验证中文姓名
  checkChinaName:function (name) {
    var re = /^([\u4E00-\u9FFF]|\w){3,11}$/;
    if (re.test(name)) {
      return true;
    } else {
      return false;
    }
  },
  checkMobile: function (str) { //手机正则
    var re = /^(13[0-9]|15[0-9]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    /^([\u4E00-\u9FFF]|\w){3,11}$/
    if(re.test(str)){
      return true;
    }
    return false;
  },
  checkPwd: function (pwd) { //密码正则,由字母开头
    var re = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;
    if (re.test(pwd)) {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 检查是否为正整数
   * @param num
   * @returns {boolean}
   */
  checkPInt: function (num) {
    var re = /^[1-9][0-9]*$/;
    if (re.test(num)) {
      return true;
    } else {
      return false;
    }
  },
  isInt:function (num){
    var re = /^[-]?[0-9]*$/;
    if (re.test(num)) {
      return true;
    } else {
      return false;
    }
  },
  showErr: function (msg, attr) {
    var index = layer.tips(msg, attr, {
      tips: 3
    });
    $(attr).on('focus', function () {
      setTimeout(function () {
        layer.close(index);
      }, 300);
    });
  },

}
function getUrl(url) {
  return '/api/' + url;
}
$(function () {
  $('input').attr('autocomplete','off');
});
