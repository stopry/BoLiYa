/**
 * Created by Alvis on 2017/7/28.
 * 分时图
 */
// var GlobalAutoChartM;
var MinuteChart = {
  createNew: function (id) {
    var minuteChart = {}
    minuteChart.chart = null;
    minuteChart.id = id;

    minuteChart.data = null;

    minuteChart.date = null;

    minuteChart.volumes = null;

    minuteChart.option = null;

    minuteChart.avgData = null;

    minuteChart.isInit = false;

    minuteChart.initTime = "";

    minuteChart.isFirst = true;

    minuteChart.h = '';

    minuteChart.buildOption = function () {
      minuteChart.option = {
        backgroundColor:'#404244',
        // animation: minuteChart.isFirst,
        animation: false,
        grid: [{
          left: '15%',
          right: '1%',
          top: '8%',
          bottom:'8%',
          // height: minuteChart.h
        }],
        xAxis: {
          scale: true,
          type: 'category',
          boundaryGap: false,
          data: minuteChart.date,
          axisLine: {
            lineStyle: {
              color: '#D5B272'
            },
          },
          axisLabel: {
            // inside: true
          },
          axisTick: {
            show: true,
            // inside:true
          },
        },
        yAxis: {
          type: 'value',
          position: 'left',
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#D5B272'
            }
          },
          splitLine: {
            show: true,
            lineStyle:{
              color:'#555'
            }
          },
          axisLabel: {
            // inside: true,
            // rotate:'50'
          },
          scale: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
          ,
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          textStyle: {
            color: '#000'
          },
          formatter: function (params, ticket, callback) {
            var str = new Date().Format('yyyy-MM-dd') + "<br>";
            var val = "";
            var nowPrice = "";
            var avgPrice = "";
            var volume = "";
            params.forEach(function (value, index, array) {
              if (value.seriesName == '分时') {
                val = value.axisValue + "<br>";
                var data = value.data;
                nowPrice = "成交价: " + data + "<br>";
              } else if (value.seriesName == '成交量') {
                var data = value.data;
                volume = "成交量: " + data + "<br>";
              } else if (value.seriesName == '均线') {
                var data = value.data;
                avgPrice = "平均价: " + data + "<br>";
              }
            });
            return str + val + nowPrice + avgPrice + volume;
          }
        },
        axisPointer: {
          link: {xAxisIndex: 'all'},
          label: {
            backgroundColor: '#E1B567'
          }
        },
        dataZoom: [{
          type: 'inside',
          disabled: true,
          start: 0,
          end: 100
        }],
        series: [
          {
            name: '分时',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#E1B567',
              }
            },
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(228, 189, 119,1)'
                }, {
                  offset: 1,
                  color: 'rgba(249, 240, 225,0)'
                }])
              }
            },
            data: minuteChart.data
          }, {
            name: 'New',
            type: 'effectScatter',
            data: [[minuteChart.date[minuteChart.data.length - 1], minuteChart.data[minuteChart.data.length - 1], 1]],
            symbolSize: function () {
              return 100 / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,

            itemStyle: {
              normal: {
                color: '#DB5F5B',
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      }
    }
    //设置图表高度
    minuteChart.setChartHeight = function(h){
      minuteChart.h = h;
      minuteChart.chart.setOption({
        grid:[{
          left: '15%',
          right: '1%',
          top: '8%',
          bottom:'8%',
          height: h
        }]
      });
    }
    minuteChart.createChart = function () {
      echarts.dispose(document.getElementById('charts'));
      minuteChart.chart = echarts.init(document.getElementById('charts'));
      if (!minuteChart.data) {
        minuteChart.date = [];
        minuteChart.data = [];
        minuteChart.volumes = [];
        minuteChart.avgData = [];
        ajaxHelper.get(getUrl("quotation/getTLineList"), {"goodsType": minuteChart.id}, function (ret) {
          if (!ret.success) {
            console.info('查询数据失败...');
            return;
          }
          var retDatas = ret.obj;

          for (var i = 0; i < retDatas.length; i++) {
            var retData = retDatas[i];
            var minuteTime = retData.tlTime;
            minuteChart.date.push(minuteTime.substr(8, 2) + ':' + minuteTime.substr(10, 2));
            minuteChart.data.push(retData.price);
            minuteChart.volumes.push(0);
            minuteChart.avgData.push(retData.avgPrice);
            minuteChart.initTime = minuteTime;
          }
          var s = minuteChart.initTime.substr(0, 4) + '/' + minuteChart.initTime.substr(4, 2) + '/' + minuteChart.initTime.substr(6, 2) + ' ' + minuteChart.initTime.substr(8, 2) +
            ':' + minuteChart.initTime.substr(10, 2) + ':00';
          var startTime = new Date(s);
          var temp = startTime.getTime();
          var endTime = 0 //ret.obj.endTime;
          while (temp < endTime) {
            temp += 60 * 1000;
            minuteChart.date.push(new Date(temp).Format('hh:mm'));
          }
          minuteChart.buildOption();
          minuteChart.chart.setOption(minuteChart.option);
          if(typeof(GlobalAutoChartM)==='function')GlobalAutoChartM();
          minuteChart.isInit = true;
        }, false);
      } else {
        minuteChart.chart.setOption(minuteChart.option);
      }
      currChart = "m";
    }



    minuteChart.flush = function (retData) {
      if (!retData||retData == null||retData=={}) {
        return;
      }
      // var minuteTime = retData.tlTime;
      // if (minuteTime != minuteChart.initTime) {
      //   minuteChart.data = null;
      //   minuteChart.isFirst = false;
      //   minuteChart.isInit = false;
      //   minuteChart.createChart();
      //   return;
      // }
      // minuteChart.volumes[minuteChart.volumes.length - 1] = retData.tranVolume;
      // minuteChart.data[minuteChart.data.length - 1] = retData.price;
      // minuteChart.avgData[minuteChart.avgData.length - 1] = retData.average;
      // minuteChart.option.series[0].data = retData.price;
      // minuteChart.option.series[1].data = [[minuteChart.date[minuteChart.data.length - 1], minuteChart.data[minuteChart.data.length - 1], 1]];

      var len = minuteChart.date.length;
      var mTime = retData.tlTime.substr(8, 2) + ':' + retData.tlTime.substr(10, 2);
      if (mTime == minuteChart.date[len - 1]) {
        minuteChart.data.splice(len - 1, len - 1, retData.price);
        minuteChart.avgData.splice(len - 1, len - 1, retData.avgPrice);
      } else {
        minuteChart.data.push(retData.price);
        minuteChart.data.shift();

        minuteChart.date.push(mTime);
        minuteChart.date.shift();

        minuteChart.avgData.push(retData.avgPrice);
        minuteChart.avgData.shift();
      }
      minuteChart.option.xAxis.data = minuteChart.date;
      minuteChart.option.series[0].data = minuteChart.data;
      minuteChart.option.series[1].data[0] = [minuteChart.date[minuteChart.data.length - 1], minuteChart.data[minuteChart.data.length - 1], 1];
      minuteChart.chart.setOption(minuteChart.option);

      // minuteChart.chart.setOption({
        // series: minuteChart.option.series
      // });
    };

    return minuteChart;
  }
}
