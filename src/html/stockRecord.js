
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
  })
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
      // if(!res.success){
      //   showTips(res.msg);
      // }else{
      var list = res.obj;
      // if(list&&list.length){
      var html = ''
      for(var i = 0;i<10;i++){
        html += '<div class="item borderBot rch add">'+
          '<div class="top">'+
          '<div class="proType">'+
          '<span>商品：铜版块</span>'+
        '<i class="profit">赚</i>'+
          '</div>'+
          '<div class="openBtn feedBtn">'+
          '<i class="icon iconfont icon-xia">展开查看∨</i>'+
        '<i class="icon iconfont icon-shang">收起∧</i>'+
        '</div>'+
        '<div class="money">'+
          '+1000'+
          '</div>'+
          '</div>'+
          '<div class="verObj">'+
          '<div class="item" style="overflow: visible">'+
          '<table>'+
          '<tr>'+
          '<td>数量：</td>'+
        '<td>1</td>'+
        '</tr>'+
        '<tr>'+
        '<td>建仓价：</td>'+
        '<td>1998</td>'+
        '</tr>'+
        '<tr>'+
        '<td>平仓价：</td>'+
        '<td>2018</td>'+
        '</tr>'+
        '<tr class="dateInfo">'+
          '<td>创建时间：</td>'+
        '<td>'+
        '<span>'+
        '2018-01-12 12：03：22'+
        '</span>'+
        '</td>'+
        '</tr>'+
        '<tr class="dateInfo" >'+
          '<td>创建时间：</td>'+
        '<td>'+
        '<span>'+
        '2018-01-12 12：03：22'+
        '</span>'+
        '</td>'+
        '</tr>'+
        '</table>'+
        '</div>'+
        '<div class="item">'+
          '<table>'+
          '<tr>'+
          '<td>定金：</td>'+
        '<td>100</td>'+
        '</tr>'+
        '<tr>'+
        '<td>平仓类型：</td>'+
        '<td>止损</td>'+
        '</tr>'+
        '<tr>'+
        '<td>止盈止损点数：</td>'+
        '<td>4（看涨）</td>'+
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
          '<td colspan="2">手续费：2</td>'+
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
      // }
      // }
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
