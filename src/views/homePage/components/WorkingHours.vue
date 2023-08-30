<template>
  <div class="pic">
    <div class="pic-one">
      <div class="hour-title">工时</div>
      <div class="hour-icon">
        <el-button-group>
          <el-button :class="{selectBtn:currSelect===1}" @click="changeone">周</el-button>
          <el-button :class="{selectBtn:currSelect===2}" @click="change">月</el-button>
        </el-button-group>

      </div>
    </div>
    <div class="hour">
      <div id="myChart" class="charts" v-if="days"></div>
      <div id="myChart2" class="charts" v-else></div>
    </div>
  </div>

</template>
<script>
// import { getHours, getMonth } from '@/api/home'
import * as echarts from 'echarts';
require('echarts/theme/macarons') // echarts theme


export default {

  name: "WorkingHours",
  data () {
    return {
      currSelect: 1,
      days: true,
      myChart: null,//接收实例对象
      myChart2: null,
      projectDate: [],
      hours: [],
      month: [],
      hoursTwo: [],
      // dataone: []

    }
  },

  mounted () {

  },
  created () {
    // this.getHours()
    // this.getMonth()
  },
  methods: {
    async getHours () {
      let res = await getHours()
      this.data = res.data
      this.data.forEach((item) => {
        var date = new Date(item.projectDate);
        //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + "-";
        let M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        let D = date.getDate() + " ";
        item.projectDate = M + D;
        this.projectDate.push(item.projectDate)
        this.hours.push(item.hours)
      });
      this.Line();
    },
    async getMonth () {
      let res = await getMonth()
      this.dataone = res.data
      if (this.dataone == null) {
        this.dataone = [{ month: '暂无数据', hours: 0 }]
        this.dataone.forEach((item) => {
          this.month.push(item.month)
          this.hoursTwo.push(item.hours)
        })

      } else if (this.dataone == '') {
        this.dataone = [{ month: '暂无数据', hours: 0 }]
        this.dataone.forEach((item) => {
          this.month.push(item.month)
          this.hoursTwo.push(item.hours)
        })
      } else {
        this.dataone.forEach((item) => {
          this.month.push(item.month)
          this.hoursTwo.push(item.hours)
        })
      }
    },
    changeone () {
      this.days = true
      this.currSelect = 1;
      this.$nextTick(() => {
        // 初始化echarts图表
        this.Line();
      });
    },
    change () {
      this.days = false
      this.currSelect = 2;
      this.$nextTick(() => {
        this.LineOne()
      })
    },
    Line () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      window.addEventListener("resize", function () { myChart.resize(); });
      // 绘制图表
      myChart.setOption({
        xAxis: {
          axisLabel: {
            formatter: `{value}日`, // 在每个x轴坐标都添加了单位
            interval: 0,//代表显示所有x轴标签显示
          },
          type: 'category',
          data: this.projectDate
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
        series: [
          {
            name: '工时',
            data: this.hours,
            itemStyle: {
              normal: {
                color: '#5087ec',
              }
            },
            type: 'line'
          }
        ],
        //悬浮框
        tooltip: {
          trigger: 'item',
          formatter: "{a}<br>{b}：{c}小时",

        },
      });
      // 
    },
    LineOne () {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = echarts.init(document.getElementById("myChart2"));
      window.addEventListener("resize", function () { myChart2.resize(); });
      // 绘制图表
      myChart2.setOption({
        title: {
          text: ''
        },
        xAxis: {
          axisLabel: {
            formatter: `{value}月`, // 在每个x轴坐标都添加了单位
            interval: 0,//代表显示所有x轴标签显示
          },
          type: 'category',
          data: this.month
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
        series: [{
          name: '工时',
          data: this.hoursTwo,
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
        },],
        tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
          trigger: 'item',
          formatter: "{a}<br>{b}月：{c}小时",
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
    }
  },

}
</script>
<style lang="scss" scoped>
.selectBtn {
  background-color: #1684fc;
  color: #ffffff;
}
.pic {
  display: flex;
  width: 100%;
  height: 250px;
  flex-direction: column;
  .pic-one {
    width: 100%;
    height: 50px;
    // display: flex;
    .hour-icon {
      margin-top: 10px;
      display: flex;
      float: right;
      margin-right: 10px;
    }
    .hour-title {
      display: flex;
      float: left;
      // position: absolute;
      margin-left: 10px;
      margin-top: 10px;
      height: 20px;
      font-size: 16px;
      font-family: Source Han Sans CN, Source Han Sans CN-Medium;
      font-weight: 550;
      color: rgba(0, 0, 0, 0.85);
      line-height: 20px;
    }
  }
  .hour {
    width: 100%;
    display: flex;
    height: 230px;
    position: relative;
    justify-content: center;
    align-items: center;
    .charts {
      width: calc(100% - 5%);
      height: calc(100% - 5%);
      justify-content: center;
      align-items: center;
    }
  }
}
</style>