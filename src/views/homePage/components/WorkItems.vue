<template>
  <div class="picture">
    <div class="work-title">工作项 </div>
    <div class="work">
      <div id="myChartWork" class="charts"></div>
    </div>
  </div>

</template>
<script>
// import { getEdition } from '@/api/home'
export default {
  name: "WorkItems",
  // props: {
  //   complete: {
  //     type: Array,
  //     default: () => [
  //     ],
  //   },
  //   underway: {
  //     type: Array,
  //     default: () => [
  //     ],
  //   },
  //   notStart: {
  //     type: Array,
  //     default: () => [
  //     ],
  //   },
  // },
  data () {
    return {
      data: {},
      complete: [], //已完成
      underway: [],//进行中
      notStart: []//未开始

    }
  },
  created () {
    // this.getNumber()
  },
  methods: {
    async getNumber () {
      let res = await getEdition()
      this.data2 = res.data.demanRes
      this.data3 = res.data.defectRes
      this.data1 = res.data.taskRes
      this.data1 == null ? (this.data1 = { notStart: 0, underway: 0, complete: 0 }) : this.data1 = this.data1
      this.data2 == null ? (this.data2 = { notStart: 0, underway: 0, complete: 0 }) : this.data2 = this.data2
      this.data3 == null ? (this.data3 = { notStart: 0, underway: 0, complete: 0 }) : this.data3 = this.data3
      if ((this.data2 != null) && (this.data1 != null) && (this.data3 != null)) {
        this.complete = [this.data3, this.data1, this.data2].map(e => e.complete)
        this.underway = [this.data3, this.data1, this.data2].map(e => e.underway)
        this.notStart = [this.data3, this.data1, this.data2].map(e => e.notStart)
        this.drawLine()
      }

    },

    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartWork"));
      window.addEventListener("resize", function () { myChart.resize(); });

      // 绘制图表
      myChart.setOption({
        grid: {
          top: '25%',//距上边距
          left: '15%',//距离左边距
          right: '20%',//距离右边距
          bottom: '25%',//距离下边距
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          // type: 'scroll',
          // orient: 'horizontal',
          orient: 'vertical',
          left: 'right',
          y: 'center',
          icon: "circle",
        },
        xAxis: {
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
        yAxis: {
          type: 'category',
          data: ['缺陷', '任务', '需求']
        },
        series: [
          {
            name: '未开始',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#ccf783',
              }
            },
            label: {
              show: false,
              position: 'inside'
            },
            data: [20, 40, 60]
            // data: this.notStart
          },
          {
            name: '进行中',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#b4fdff',
              }
            },
            label: {
              show: false,
              position: 'inside'
            },
            data: this.underway

          },
          {
            name: '已完成',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#5087ec',
              }
            },
            label: {
              show: false,
              position: 'inside'
            },
            data: this.complete

          },

        ]

      });
    },

  }

}
</script>
<style lang="scss" scoped>
.picture {
  display: flex;
  width: 100%;
  height: 240px;

  .work-title {
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
  .work {
    width: 95%;
    display: flex;
    height: 220px;
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