<template>
  <div class="pic">
    <div class="member-title">成员 </div>

    <div class="member">
      <div id="myChartMember" class="charts"></div>
    </div>
  </div>
</template>
<script>
// import { getEmployee } from '@/api/home'

export default {
  name: "MemberOne",
  data () {
    return {
      employeeName: [],
      notComplete: [],
      complete: [],
    }
  },
  created () {
    // this.getEmployee()
  },
  mounted () {
  },
  methods: {
    async getEmployee () {
      let res = await getEmployee()
      this.data = res.data
      this.data.forEach((item) => {
        this.employeeName.push(item.employeeName)
        this.notComplete.push(item.notComplete)
        this.complete.push(item.complete)
        this.drawone();
      })
    },
    drawone () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartMember"));
      window.addEventListener("resize", function () { myChart.resize(); });

      // 绘制图表
      myChart.setOption({
        grid: {
          top: '25%',//距上边距
          left: '15%',//距离左边距
          right: '20%',//距离右边距
          bottom: '25%',//距离下边距
        },
        title: {
          text: ''
        },
        xAxis: {
          axisLabel: {
            interval: 0, //控制X轴刻度全部显示
            formatter: function (value) {
              let len = value.length;
              let length = 12; //控制一行显示个数
              let num = Math.ceil(len / length);//循环次数
              if (num > 1) {
                let str = '';
                for (let i = 0; i < num; i++) {
                  str += value.substring(i * length, (i + 1) * length) + '\n';
                }
                return str;
              } else {
                return value;
              }
            }
          },
          type: 'category',
          data: this.employeeName
        },
        yAxis: {
          type: 'value',
          axisLine: {//坐标轴
            lineStyle: {
              opacity: 0.01,//设置透明度就可以控制显示不显示
            },
          },
          axisTick: {//刻度线
            show: false,//去掉刻度线
          },
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          y: 'center',
          data: ['已完成', '未完成']
        },
        series: [{
          name: '已完成',
          data: this.complete,
          barGap: 0,//不同系列的柱间距离，为百分比
          itemStyle: {
            normal: {
              color: '#5087ec',
            }
          },
          type: 'bar',
          label: {
            show: false,
            position: 'top'
          }
        },
        {
          name: '未完成',
          data: this.notComplete,
          itemStyle: {
            normal: {
              color: ' #68bbc4',
            }
          },
          type: 'bar',
          label: {
            show: false,
            position: 'top'
          }
        }],
        tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
          trigger: 'item',
          backgroundColor: 'rgba(32, 33, 36,.7)',
          borderColor: 'rgba(32, 33, 36,0.20)',
          borderWidth: 1,
          textStyle: { // 文字提示样式
            color: '#fff',
            fontSize: '12'
          },
          axisPointer: { // 坐标轴虚线
            type: 'shadow',
            label: {
              backgroundColor: '#6a7985'
            }
          },
        }
      });
    },
  }

}
</script>
<style lang="scss" scoped>
.pic {
  display: flex;
  width: 100%;
  height: 240px;
  .member-title {
    position: absolute;
    margin-left: 10px;
    margin-top: 10px;
    height: 20px;
    font-size: 16px;
    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
    font-weight: 550;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
  }
  .member {
    width: 95%;
    display: flex;
    height: 230px;
    position: relative;
    justify-content: center;
    align-items: center;

    .charts {
      width: calc(100% - 10%);
      height: calc(100% - 20%);
    }
  }
}
</style>