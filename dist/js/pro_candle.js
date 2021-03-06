/**
 * Created by Alvis on 2017/7/28.
 * K线图
 */
// var GlobalAutoChart;
var CandleChart = {
  createNew: function (id, type) {
    var candleChart = {};
    candleChart.id = id; //数据ID
    candleChart.type = type;
    candleChart.chart = null;
    candleChart.data = null;
    candleChart.option = null;
    candleChart.isInit = false;
    candleChart.sValue = 0;
    candleChart.eValue = 100;

    candleChart.splitData = function (rawData) {
      var categoryData = [];
      var values = [];
      var volumes1 = [];
      var volumes2 = [];
      for (var i = 0; i < rawData.length; i++) {
        var d = [];
        d.push(rawData[i].openPrice) //开盘价
        d.push(rawData[i].closePrice) //收盘价
        d.push(rawData[i].lowPrice) //最低价
        d.push(rawData[i].highPrice) //最高价
        //d.push(rawData[i].changePrice) //涨跌额
        //d.push(rawData[i].changeRate * 100 + '%') //涨跌幅
        //d.push(rawData[i].tranVolume)//成交量
        categoryData.push(fomat(rawData[i].klTime));
        values.push(d);
        // volumes1.push(rawData[i].tranVolume);
        // if (rawData[i].changePrice <= 0) {
        //   volumes2.push(0);
        // } else {
        //   volumes2.push(rawData[i].tranVolume);
        // }
      }
      if (categoryData.length < 20) {
        var da = new Date(categoryData[categoryData.length - 1]);
        for (var i = 0; i < 20 - categoryData.length; i++) {
          da.setDate(da.getDate() + 1);
          categoryData.push(da.Format('yyyy/MM/dd'));
        }
      }
      return {
        categoryData: categoryData,
        values: values,
        volumes1: volumes1,
        volumes2: volumes2
      };
    }
    candleChart.buildOption = function () {
      candleChart.option = {
        backgroundColor:'#404244',
        legend: {
          data: [
            {
              name:''
            },
            {
              name:'MA5',
              icon:"none",
              textStyle:{
                color:'#915bff',
              }
            },
            {
              name:'MA10',
              icon:"none",
              textStyle:{
                color:"#ff8811"
              }
            },
            {
              name:'MA20',
              icon:"none",
              textStyle:{
                color:'#3e58db'
              }
            }
          ],
          // inactiveColor: '#aaa',
          textStyle: {
            color: '#D5B272',
            background:'#ff0000'
          },
          top: '-8',
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
          }
          ,
          formatter: function (params, ticket, callback) {
            var str = '';
            params.forEach(function (value, index, array) {
              if (value.seriesName == '日K') {
                str += value.axisValue + "<br>";
                var data = value.data;
                var color = "";
                if (parseFloat(data[5]) < 0) {
                  color = '#ffff00';
                } else if (parseFloat(data[5]) > 0) {
                  color = '#ff00ff';
                }
                str += "开盘价:" + data[1] + "<br>";
                str += "收盘价:" + data[2] + "<br>";
                str += "最低价:" + data[3] + "<br>";
                str += "最高价:" + data[4] + "<br>";
                // str += "涨跌额:<em style=\"color: " + color + "\">" + data[5] + "</em><br>";
                // str += "涨跌幅:<em style=\"color: " + color + "\">" + data[6] + "</em><br>";
                // str += "成交量:" + data[7] + "<br>";
              }
            });
            return str;
          }
        },
        axisPointer: {
          label: {
            backgroundColor: '#777'
          }
        },
        grid: [{
          left: '15%',
          right: '1%',
          top: '8%',
          bottom:'8%',
          // height: '249px'
        }]
        ,
        xAxis: {
          type: 'category',
          data: candleChart.data.categoryData,
          scale: true,
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#D5B272'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            alignWithLabel: true,
            show: true,
            // inside:true
          },
          axisLabel: {
            formatter: function (value, index) {
              return value.substr(5);
            },
            // inside: true
          }
        }
        ,
        yAxis: {
          scale: true,
          position: 'left',
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
          splitNumber: 4,
        },
        dataZoom: [
          {
            type: 'slider',
            show: false,
            start: 1,
            end: 100,
          }
        ],
        series: [
          {
            name: '日K',
            type: 'candlestick',
            data: candleChart.data.values,
            itemStyle: {
              normal: {
                color: '#CC6660',
                color0: '#4FAC90',
                borderColor: '#CC6660',
                borderColor0: '#4FAC90'
              }
            }
          },
          {
            name: 'MA5',
            type: 'line',
            data: candleChart.calculateMA(5),
            smooth: true,
            color:'#915bff',
            lineStyle: {
              normal: {
                opacity: 1,
                width: 1,
                color:'#915bff'
              },
            },
            itemStyle: {
              normal: {
                opacity: 0,
                // color:'#4043d7'
              },
              // color:'#4043d7'
            },
            hoverAnimation: false,
          },
          {
            name: 'MA10',
            type: 'line',
            data: candleChart.calculateMA(10),
            smooth: true,
            color:'#ff8811',
            lineStyle: {
              normal: {
                opacity: 1,
                width: 1,
                color:'#ff8811',
              },
            },
            itemStyle: {
              normal: {
                opacity: 0,
              }
            },
            hoverAnimation: false,
          },
          {
            name: 'MA20',
            type: 'line',
            data: candleChart.calculateMA(20),
            smooth: true,
            color:'#3e58db',
            lineStyle: {
              normal: {
                opacity: 1,
                width: 1,
                color:'#3e58db',
              },
            },
            itemStyle: {
              normal: {
                opacity: 0,
              }
            },
            hoverAnimation: false,
          }
        ]
      }
    }
    //设置图表高度
    candleChart.setChartHeight = function(h){
      candleChart.chart.setOption({
        grid:[{
          left: '15%',
          right: '1%',
          top: '8%',
          bottom:'5%',
          height: h
        }]
      });
    }
    candleChart.createChart = function () {
      //销毁前面实例
      echarts.dispose(document.getElementById('charts'));
      candleChart.chart = echarts.init(document.getElementById('charts'));
      if (!candleChart.data) {
        //从服务器获数据
        ajaxHelper.get(getUrl('quotation/getKLineList'), {
          "goodsType": candleChart.id,
          "chartType": candleChart.type
        }, function (ret) {
          if (!ret.success) {
            console.info('查询数据失败...');
            return;
          }
          candleChart.data = candleChart.splitData(ret.obj);
          candleChart.sValue = (candleChart.data.categoryData.length - 20 <= 0 ? 0 : candleChart.data.categoryData.length - 20);
          candleChart.eValue = candleChart.data.categoryData.length - 1;
          candleChart.buildOption();
          if (candleChart.data.categoryData.length >= 20) {
            candleChart.option.dataZoom = [
              {
                type: 'inside',
                startValue: candleChart.sValue,
                endValue: candleChart.eValue,
                minValueSpan: 20,
              }
            ]

          }
          candleChart.chart.setOption(candleChart.option);
          // if(typeof(GlobalAutoChartM)==='function')GlobalAutoChartM();
          candleChart.isInit = true;
        }, false);
      } else {
        candleChart.chart.setOption(candleChart.option);
      }
      currChart = "k";
    }

    candleChart.flush = function (data) {
      if (data == null) {
        return;
      }

      var len = candleChart.data.values.length;
      var val = [];
      val.push(data.openPrice) //开盘价
      val.push(data.closePrice) //收盘价
      val.push(data.lowPrice) //最低价
      val.push(data.highPrice) //最高价

      var klTime = fomat(data.klTime);
      var oldKlTime = candleChart.data.categoryData[len - 1];

      if (klTime == oldKlTime) {
        candleChart.data.values.splice(len - 1, len - 1, val);
      } else {
        candleChart.data.values.push(val);
        candleChart.data.values.shift();

        candleChart.data.categoryData.push(klTime);
        candleChart.data.categoryData.shift();
      }
      candleChart.option.series[0].data = candleChart.data.values;
      //candleChart.option.series[0].markLine.data[0].yAxis = candleChart.data.values[candleChart.data.values.length - 1][1];
      candleChart.option.series[1].data = candleChart.calculateMA(5);
      candleChart.option.series[2].data = candleChart.calculateMA(10);
      candleChart.option.series[3].data = candleChart.calculateMA(20);
      // candleChart.chart.setOption({
      //   series: candleChart.option.series
      // });
      candleChart.chart.setOption(
        candleChart.option
      );

      /*
      var len = candleChart.data.values.length;
      var val = [];
      val.push(data.openPrice) //开盘价
      val.push(data.closePrice) //收盘价
      val.push(data.lowPrice) //最低价
      val.push(data.highPrice) //最高价
      // val.push(data.changePrice) //涨跌额
      // val.push(data.changeRate + '%') //涨跌幅
      // val.push(data.tranVolume)//成交量
      candleChart.data.values[len - 1] = val;
      candleChart.option.series[0].data = candleChart.data.values;
      candleChart.option.series[1].data = candleChart.calculateMA(5);
      candleChart.option.series[2].data = candleChart.calculateMA(10);
      candleChart.option.series[3].data = candleChart.calculateMA(20);
      candleChart.chart.setOption({
        series: candleChart.option.series
      });
      */
    }

    candleChart.calculateMA = function (dayCount) {
      var result = [];
      for (var i = 0, len = candleChart.data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += candleChart.data.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    }
    return candleChart;
  }
};

function fomat(str) {
  return str.substr(0, 4) + "/" + str.substr(4, 2) + "/" + str.substr(6, 2) + " " + str.substr(8, 2) + ":" + str.substr(10, 2);
}
